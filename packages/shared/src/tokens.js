/**
 * Vivah Spot design tokens — THE single source of truth for colour and type.
 *
 * Mirrors the `:root` custom properties in the prototype's `styles.css`, which is the
 * design spec for both clients.
 *
 * This file is plain ESM JavaScript on purpose: Tailwind configs execute in Node and
 * cannot import raw TypeScript. TypeScript consumers still get full inference via
 * `allowJs`. Do not convert it back to .ts — you will break both Tailwind configs.
 *
 * Consumed by:
 *   - apps/mobile/tailwind.config.js   (Tailwind 3 + NativeWind 4)
 *   - packages/shared/src/tokens.css   (Tailwind 4 @theme, for vendor-web)
 *   - .tsx in both apps, for runtime values Tailwind can't express (gradients, shadows)
 */

export const colors = {
  /** Soft pink-tinted white — app background */
  bg: '#fff7fb',
  /** Card / sheet surface */
  surface: '#ffffff',
  /** Deep plum-grey — primary text */
  text: '#3a2f37',
  /** Muted mauve-grey. Darkened in the prototype to meet WCAG AA (~5.5:1 on white) — do not lighten */
  textSoft: '#736570',

  /** Primary festive accent — vivid rose-pink */
  accent: '#e23e7a',
  accentDark: '#c62368',
  /** Pink wash, for accent backgrounds */
  accentSoft: '#fde7f0',

  /** Hairline border */
  border: '#f4e3ec',
};

/** Festive wedding palette — category chips, badges, status colours */
export const festive = {
  pink: '#e23e7a',
  /** Marigold */
  orange: '#ff7a3d',
  gold: '#f5b301',
  teal: '#12b3a3',
  purple: '#8b5cf6',
  blue: '#3b9ae1',
  red: '#ef4d5a',
  green: '#2bb673',
};

/**
 * Brand gradient: pink → marigold, 135deg.
 * Web uses `css`. React Native has no CSS gradients — use `expo-linear-gradient` with
 * `stops`, and `start`/`end` to reproduce the 135deg angle.
 */
export const gradient = {
  css: 'linear-gradient(135deg, #e23e7a 0%, #ff7a3d 100%)',
  stops: ['#e23e7a', '#ff7a3d'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

/**
 * Prototype shadow: `0 4px 16px rgba(180, 50, 110, 0.08)` — a warm pink-tinted shadow,
 * not neutral grey. RN needs the parts separately, plus `elevation` on Android.
 */
export const shadow = {
  css: '0 4px 16px rgba(180, 50, 110, 0.08)',
  native: {
    shadowColor: '#b4326e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
};

/**
 * Display serif for headings; body is the system sans stack.
 *
 * NOTE: the prototype self-hosts `fonts/playfair-display.woff2`. React Native cannot load
 * woff2 — the mobile app needs the .ttf/.otf cut of Playfair Display loaded via `expo-font`
 * before `headingFamily` is usable there.
 */
export const fonts = {
  heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
  headingFamily: 'Playfair Display',
  body: '"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif',
};

/** Flat map for Tailwind `theme.extend.colors`. Keys become utility names: `bg-accent`, `text-text-soft`. */
export const tailwindColors = {
  bg: colors.bg,
  surface: colors.surface,
  text: colors.text,
  'text-soft': colors.textSoft,
  accent: colors.accent,
  'accent-dark': colors.accentDark,
  'accent-soft': colors.accentSoft,
  border: colors.border,
  pink: festive.pink,
  marigold: festive.orange,
  gold: festive.gold,
  teal: festive.teal,
  purple: festive.purple,
  blue: festive.blue,
  red: festive.red,
  green: festive.green,
};

export const tokens = {
  colors,
  festive,
  gradient,
  radius,
  shadow,
  fonts,
  tailwindColors,
};
