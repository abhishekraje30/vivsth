/**
 * The single entry point every spec imports `test` from.
 *
 * There is exactly one of these per project. The reason is not tidiness: fixtures compose
 * by merging, and two merge points mean two different `test` objects whose fixtures do not
 * see each other. A spec that imports `test` from `@playwright/test` silently loses every
 * fixture below and fails with an unhelpful "unknown fixture" much later.
 *
 * What each merged fixture buys a suite that has no unit layer:
 *
 *   apiRequest    seeds state through whitelisted RPC so a journey spends its time on the
 *                 journey, not on twenty minutes of form filling
 *   intercept     watches the real request a click produced, declared before navigation
 *   networkError  fails a test on a 4xx/5xx the UI swallowed into a green screen
 *   recurse       waits out eventual consistency without a sleep
 *   auth          hands over a cached vendor session instead of re-signing-in per test
 *
 * On top of the merge, `page` is extended by one line of bookkeeping: it stamps the moment
 * the recording starts. The narration reporter lines each step's narration up against the
 * video with it. Only tests that open a page pay for it, so API specs stay browser-free.
 */
import { mergeTests } from '@playwright/test';
import { log } from '@seontechnologies/playwright-utils';
import { test as apiRequestFixture } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { test as interceptFixture } from '@seontechnologies/playwright-utils/intercept-network-call/fixtures';
import { test as networkErrorFixture } from '@seontechnologies/playwright-utils/network-error-monitor/fixtures';
import { test as recurseFixture } from '@seontechnologies/playwright-utils/recurse/fixtures';

import { test as authFixture } from './auth-fixture';
import { VIDEO_START_ANNOTATION } from './narration-reporter';

const merged = mergeTests(apiRequestFixture, interceptFixture, networkErrorFixture, recurseFixture, authFixture);

export const test = merged.extend({
  page: async ({ page }, use, testInfo) => {
    // Recording begins when the page is created, which is the moment this runs.
    testInfo.annotations.push({ type: VIDEO_START_ANNOTATION, description: String(Date.now()) });
    await use(page);
  },
});

export { expect } from '@playwright/test';
export { log };
