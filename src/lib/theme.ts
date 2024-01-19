import type { GitHubPalette, Theme } from "@/types";

/** Day: 6:00 AM – 5:59 PM local. Night: 6:00 PM – 5:59 AM local. */
export const NIGHT_START_HOUR = 18;
export const NIGHT_END_HOUR = 6;

export const GITHUB: Record<Theme, GitHubPalette> = {
  dark: {
    canvas: "#0d1117",
    canvasSubtle: "#161b22",
    canvasInset: "#010409",
    fg: "#e6edf3",
    fgMuted: "#8b949e",
    border: "#30363d",
    success: "#3fb950",
    successEmphasis: "#238636",
    successHover: "#2ea043",
    successBright: "#56d364",
  },
  light: {
    canvas: "#ffffff",
    canvasSubtle: "#f6f8fa",
    fg: "#1f2328",
    fgMuted: "#656d76",
    border: "#d0d7de",
    success: "#1f883d",
    successFg: "#1a7f37",
  },
};

export const getThemeFromLocalTimezone = (date: Date = new Date()): Theme => {
  const hour = date.getHours();
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR ? "dark" : "light";
};

export const applyThemeClass = (theme: Theme): void => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

export const clearStoredTheme = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("theme");
    localStorage.removeItem("theme-override");
  } catch {
    // ignore storage errors
  }
};
