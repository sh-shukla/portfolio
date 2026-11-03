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
        link: v("link"),
        ok: v("ok"),
        accent: { DEFAULT: "#0071e3", hover: "#0077ed" },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', "Inter", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.035em", tighter: "-0.025em", snug: "-0.015em" },
      maxWidth: { page: "1120px" },
      borderRadius: { tile: "28px" },
      boxShadow: { tile: "0 1px 2px rgb(0 0 0 / 0.04), 0 10px 30px rgb(0 0 0 / 0.06)" },
    },
  },
  plugins: [],
} satisfies Config;
