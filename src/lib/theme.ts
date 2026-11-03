import { useEffect, useState } from "react";

// Light/dark theme. index.html sets the initial class before first paint (no flash);
// this hook keeps it in sync. With no saved choice the site follows the OS setting.
export type Theme = "light" | "dark";

const KEY = "theme";
const query = () => window.matchMedia("(prefers-color-scheme: dark)");
const systemTheme = (): Theme => (query().matches ? "dark" : "light");

function saved(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function apply(t: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#000000" : "#fbfbfd");
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.classList.contains("dark") ? "dark" : "light"));

  useEffect(() => {
    const mq = query();
    const onChange = () => {
      if (saved()) return;
      const t = systemTheme();
      apply(t);
      setTheme(t);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      // Choosing the OS theme again clears the override, so the site goes back to following the OS.
      if (next === systemTheme()) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      // Storage blocked (private mode): the switch still applies for this visit.
    }
    apply(next);
    setTheme(next);
  }

  return { theme, toggle };
}
