const { tailwindColors, fonts, radius } = require('@vivahspot/shared/tokens');

/**
 * Tailwind 3 + NativeWind 4. Pinned to tailwindcss@3.4.17 because NativeWind's stable
 * line does not support Tailwind 4 — that needs NativeWind 5, which is pre-release.
 *
 * Colours come from @vivahspot/shared/tokens (canonical). Don't hardcode hexes here.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: tailwindColors,
      borderRadius: {
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
        pill: `${radius.pill}px`,
      },
      fontFamily: {
        heading: [fonts.headingFamily],
      },
    },
  },
  plugins: [],
};
