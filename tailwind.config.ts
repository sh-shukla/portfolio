import type { Config } from "tailwindcss";

// Colours are CSS variables (see src/index.css) so every utility follows the light/dark theme.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"),
        surface: v("surface"),
        ink: v("ink"),
        mute: v("mute"),
        faint: v("faint"),
        line: v("line"),
        accent: v("accent"),
        "on-accent": v("on-accent"),
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em", tighter: "-0.028em", snug: "-0.012em", label: "0.14em" },
      maxWidth: { page: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
