import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        mute: "#6e6e73",
        faint: "#86868b",
        canvas: "#fbfbfd",
        mist: "#f5f5f7",
        line: "#d2d2d7",
        accent: { DEFAULT: "#0071e3", hover: "#0077ed", link: "#0066cc", bright: "#2997ff" },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', "Inter", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.035em", tighter: "-0.025em", snug: "-0.015em" },
      maxWidth: { page: "1120px", copy: "780px" },
      borderRadius: { tile: "28px" },
      boxShadow: { tile: "0 2px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.04)" },
    },
  },
  plugins: [],
} satisfies Config;
