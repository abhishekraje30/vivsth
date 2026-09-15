/**
 * Turns the recording of a passing test into a narrated how-to guide for that feature.
 *
 * Why a reporter and not part of the test: a test must stay fast and deterministic, and a
 * guide must be paced for a person. So the test runs at machine speed and records, and this
 * reporter re-times the recording afterwards. Nothing here can make a test pass or fail.
 *
 * Why step titles are the script: every spec already narrates itself through `log.step`,
 * which opens an empty `test.step` as a timestamp marker. Voicing those titles means the
 * narration cannot drift from what the test does — rename the step and the guide follows.
 * A spec with badly written step titles produces a badly narrated guide, which is the right
 * pressure to put on spec authors.
 *
 * How the timing works: each step's marker splits the video into segments. Every segment is
 * held on its last frame until its narration has finished, then the next begins. Playwright
 * encodes video with audio explicitly stripped, so the sound track is built here from Piper
 * clips and muxed with ffmpeg.
 *
 * Each segment also carries its narration line as a subtitle, so a guide reads with the sound
 * off. The subtitle is drawn here rather than by Playwright's own overlay, which shows the spec
 * file path and priority tag, sits over the page's heading, and cannot show a `log.step` title
 * because those markers last about a millisecond.
 *
 * Only journeys get a guide, because a guide shows a person doing something. API specs still
 * open a browser — `apiRequest`'s fixture depends on `page` — so they record a blank window, and
 * narrating that would teach nothing.
 *
 * Only passing tests get a guide. A failed run's video is evidence for diagnosing the break,
 * and narrating a broken feature would teach the wrong thing.
 *
 * When guides are on and Piper, the voice or ffmpeg is missing, the run is reported failed.
 * A silent success here would leave everyone believing guides exist.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';

import type { FullConfig, FullResult, Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

/** Annotation the page fixture writes when the recording starts. Shared with merged-fixtures. */
export const VIDEO_START_ANNOTATION = 'video-start';

/** Silence after each narrated line before the next step begins, in seconds. */
const PAUSE_AFTER_LINE = 0.5;
/** Shortest video slice worth cutting; below one frame at 25fps, ffmpeg yields nothing to hold. */
const MIN_SEGMENT = 0.08;
const FPS = 25;
/** Subtitle font. DejaVu Sans ships with the common Linux font packages and covers the ₹ sign. */
const CAPTION_FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
/** Characters per subtitle line at the caption size on a 1280px frame. */
const CAPTION_LINE_CHARS = 56;
/** Gap between the lowest subtitle line and the bottom edge, in pixels. */
const CAPTION_BOTTOM = 56;
/** Vertical distance between stacked subtitle lines: font size plus both box borders. */
const CAPTION_LINE_PITCH = 58;

type NarrationOptions = { outputDir?: string; journeysDir?: string };

type GuideJob = {
  name: string;
  videoPath: string;
  videoStartMs: number;
  steps: Array<{ title: string; startMs: number }>;
};

function guidesEnabled(): boolean {
  const flag = process.env.NARRATED_GUIDES;
  if (flag !== undefined && flag !== '') return flag === '1';
  return !process.env.CI;
}

function voicePath(): string {
  return process.env.PIPER_VOICE || path.join(homedir(), '.local/share/piper-voices/en_US-ljspeech-high.onnx');
}

/** Run a command without a shell, returning stdout. Rejects with the command's own stderr. */
function run(command: string, args: string[], input = ''): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => reject(new Error(`${command} could not be started: ${error.message}`)));
    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${command} exited with ${code}: ${stderr.trim().slice(-800)}`));
    });
    child.stdin.end(input);
  });
}

/**
 * Media duration in seconds. Playwright writes its webm as a stream, which often leaves the
 * container without a duration, so the last video packet's timestamp is the fallback.
 */
async function probeDuration(file: string): Promise<number> {
  const fromFormat = parseFloat(
    await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]),
  );
  if (Number.isFinite(fromFormat) && fromFormat > 0) return fromFormat;

  const packets = await run('ffprobe', [
    '-v', 'error', '-select_streams', '0', '-show_entries', 'packet=pts_time', '-of', 'csv=p=0', file,
  ]);
  const last = Math.max(...packets.split('\n').map(parseFloat).filter(Number.isFinite));
  if (!Number.isFinite(last) || last <= 0) {
    throw new Error(`could not determine the duration of ${file}`);
  }
  return last + 1 / FPS;
}

function collectSteps(steps: TestStep[], into: TestStep[]): TestStep[] {
  for (const step of steps) {
    if (step.category === 'test.step') into.push(step);
    collectSteps(step.steps, into);
  }
  return into;
}

function slugFor(test: TestCase): string {
  // Drop the priority tag: it describes the test, not the feature a viewer is learning.
  return test
    .titlePath()
    .slice(-2)
    .join(' ')
    .replace(/\[P\d\]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const seconds = (value: number): string => value.toFixed(3);

/** Break a narration line into subtitle lines on word boundaries. */
function wrapCaption(text: string): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (current && current.length + 1 + word.length > CAPTION_LINE_CHARS) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * A path placed inside an ffmpeg filter graph. Colons, commas, quotes and brackets all mean
 * something in that syntax, and escaping them correctly is a known trap, so a path containing
 * them is refused with a clear message instead of producing a baffling filter error.
 */
function filterPath(file: string): string {
  if (!/^[\w/.\-]+$/.test(file)) {
    throw new Error(`path cannot be used inside an ffmpeg filter graph: ${file}`);
  }
  return file;
}

export default class NarrationReporter implements Reporter {
  private readonly jobs = new Map<string, GuideJob>();
  private outputDir: string;
  private journeysDir: string;

  constructor(options: NarrationOptions = {}) {
    this.outputDir = options.outputDir ?? 'guides';
    this.journeysDir = options.journeysDir ?? 'tests/journeys';
  }

  onBegin(config: FullConfig): void {
    const base = config.configFile ? path.dirname(config.configFile) : process.cwd();
    this.outputDir = path.resolve(base, this.outputDir);
    this.journeysDir = path.resolve(base, this.journeysDir);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (!test.location.file.startsWith(this.journeysDir + path.sep)) return;
    if (result.status !== 'passed') return;

    const video = result.attachments.find((a) => a.name === 'video' && a.path);
    const started = result.annotations.find((a) => a.type === VIDEO_START_ANNOTATION);
    // API specs never open a page, so they have no recording and nothing to narrate.
    if (!video?.path || !started?.description) return;

    const steps = collectSteps(result.steps, [])
      .map((step) => ({ title: step.title, startMs: step.startTime.getTime() }))
      .sort((a, b) => a.startMs - b.startMs);

    // Keyed by test id, so a test that passes on retry keeps its passing attempt.
    this.jobs.set(test.id, {
      name: slugFor(test),
      videoPath: video.path,
      videoStartMs: Number(started.description),
      steps,
    });
  }

  async onEnd(): Promise<{ status?: FullResult['status'] } | undefined> {
    if (!guidesEnabled() || this.jobs.size === 0) return undefined;

    const piper = process.env.PIPER_BIN || 'piper';
    const voice = voicePath();
    try {
      await run('ffmpeg', ['-version']);
      await run(piper, ['--help']);
      if (!existsSync(voice)) throw new Error(`voice model not found at ${voice}`);
      if (!existsSync(CAPTION_FONT)) throw new Error(`subtitle font not found at ${CAPTION_FONT}`);
    } catch (error) {
      process.stdout.write(
        `\n[guides] Narrated guides are on but cannot be rendered: ${(error as Error).message}\n` +
          '[guides] Install Piper with `uv tool install piper-tts`, fetch the voice (see TESTING.md), ' +
          'or set NARRATED_GUIDES=0.\n',
      );
      return { status: 'failed' };
    }

    mkdirSync(this.outputDir, { recursive: true });
    const failures: string[] = [];

    for (const job of this.jobs.values()) {
      if (job.steps.length === 0) {
        process.stdout.write(`[guides] ${job.name}: no log.step titles, so no narration script. Skipped.\n`);
        continue;
      }
      try {
        const out = await this.render(job, piper, voice);
        process.stdout.write(`[guides] ${path.relative(process.cwd(), out)} (${job.steps.length} narrated steps)\n`);
      } catch (error) {
        failures.push(`${job.name}: ${(error as Error).message}`);
      }
    }

    if (failures.length === 0) return undefined;
    process.stdout.write(`\n[guides] ${failures.length} guide(s) failed to render:\n  ${failures.join('\n  ')}\n`);
    return { status: 'failed' };
  }

  private async render(job: GuideJob, piper: string, voice: string): Promise<string> {
    const work = await mkdtemp(path.join(tmpdir(), 'vivahspot-guide-'));
    try {
      const videoLength = await probeDuration(job.videoPath);
      const markers = job.steps.map((step) =>
        Math.min(Math.max((step.startMs - job.videoStartMs) / 1000, 0), videoLength),
      );

      const clips: Array<{ file: string; captionLines: string[]; length: number }> = [];
      for (const [index, step] of job.steps.entries()) {
        const file = path.join(work, `step-${index}.wav`);
        await run(piper, ['-m', voice, '-f', file], step.title);
        const captionLines: string[] = [];
        for (const [line, text] of wrapCaption(step.title).entries()) {
          const caption = path.join(work, `step-${index}-line-${line}.txt`);
          await writeFile(caption, text);
          captionLines.push(caption);
        }
        clips.push({ file, captionLines, length: await probeDuration(file) });
      }

      const inputs = ['-i', job.videoPath, ...clips.flatMap((clip) => ['-i', clip.file])];
      const filters: string[] = [];
      const labels: string[] = [];

      // Before the first step: the page loading, unnarrated.
      if (markers[0] >= MIN_SEGMENT) {
        const silence = clips.length + 1;
        inputs.push('-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo');
        filters.push(`[0:v]trim=start=0:end=${seconds(markers[0])},setpts=PTS-STARTPTS,fps=${FPS}[vpre]`);
        filters.push(`[${silence}:a]atrim=0:${seconds(markers[0])},asetpts=PTS-STARTPTS[apre]`);
        labels.push('[vpre][apre]');
      }

      clips.forEach((clip, index) => {
        let start = markers[index];
        const end = index + 1 < markers.length ? markers[index + 1] : videoLength;
        let slice = Math.max(end - start, MIN_SEGMENT);
        if (start + slice > videoLength) start = Math.max(0, videoLength - slice);
        slice = Math.min(slice, videoLength - start);
        const held = Math.max(slice, clip.length + PAUSE_AFTER_LINE);

        // One drawtext per subtitle line, stacked up from the bottom. A single drawtext holding
        // newlines draws a missing-glyph box at every line end with this font.
        // expansion=none: a step title containing "%" must be shown, not parsed as a template.
        const subtitles = clip.captionLines.map(
          (caption, line) =>
            `drawtext=fontfile=${filterPath(CAPTION_FONT)}:textfile=${filterPath(caption)}:expansion=none:` +
            `fontsize=34:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=12:` +
            `x=(w-text_w)/2:y=h-${CAPTION_BOTTOM + (clip.captionLines.length - line) * CAPTION_LINE_PITCH}`,
        );
        filters.push(
          `[0:v]trim=start=${seconds(start)}:end=${seconds(start + slice)},setpts=PTS-STARTPTS,fps=${FPS},` +
            `tpad=stop_mode=clone:stop_duration=${seconds(held - slice)},${subtitles.join(',')}[v${index}]`,
        );
        filters.push(
          `[${index + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,apad,` +
            `atrim=0:${seconds(held)},asetpts=PTS-STARTPTS[a${index}]`,
        );
        labels.push(`[v${index}][a${index}]`);
      });

      filters.push(`${labels.join('')}concat=n=${labels.length}:v=1:a=1[v][a]`);

      const output = path.join(this.outputDir, `${job.name}.mp4`);
      await run('ffmpeg', [
        '-v', 'error', '-y',
        ...inputs,
        '-filter_complex', filters.join(';'),
        '-map', '[v]', '-map', '[a]',
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'veryfast', '-crf', '23',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',
        output,
      ]);
      return output;
    } finally {
      await rm(work, { recursive: true, force: true });
    }
  }
}
