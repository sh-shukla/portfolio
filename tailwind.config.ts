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
        panel: v("panel"),
        ink: v("ink"),
        mute: v("mute"),
        faint: v("faint"),
        line: v("line"),
        accent: v("accent"),
        "on-accent": v("on-accent"),
        // The terminal is dark in both themes.
        term: {
          bg: "#0d0e11",
          bar: "#1b1c20",
          ink: "#e7e7ea",
          dim: "#8d919b",
          green: "#30d158",
          cyan: "#64d2ff",
          blue: "#5ea2ff",
          yellow: "#ffd60a",
        },
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: { tightest: "-0.045em", tighter: "-0.03em", snug: "-0.012em", label: "0.08em" },
      maxWidth: { content: "1120px" },
    },
  },
  plugins: [],
} satisfies Config;
