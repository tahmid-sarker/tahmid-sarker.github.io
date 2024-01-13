"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  applyThemeClass,
  clearStoredTheme,
  getThemeFromLocalTimezone,
} from "@/lib/theme";
import type { Theme } from "@/types";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

const syncThemeColorMeta = (theme: Theme): void => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0d1117" : "#ffffff");
  }
};

const applyClockTheme = (): Theme => {
  const next = getThemeFromLocalTimezone();
  applyThemeClass(next);
  syncThemeColorMeta(next);
  return next;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const manualOverrideRef = useRef(false);

  useLayoutEffect(() => {
    clearStoredTheme();
    manualOverrideRef.current = false;
    // Apply clock-based theme after mount to match the inline blocking script.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration sync
    setThemeState(applyClockTheme());
  }, []);

  useEffect(() => {
    const syncFromClock = () => {
      if (manualOverrideRef.current) return;
      setThemeState(applyClockTheme());
    };

    syncFromClock();

    const intervalId = window.setInterval(syncFromClock, 15_000);
    window.addEventListener("focus", syncFromClock);
    document.addEventListener("visibilitychange", syncFromClock);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", syncFromClock);
      document.removeEventListener("visibilitychange", syncFromClock);
    };
  }, []);

  const setTheme = (nextTheme: Theme) => {
    manualOverrideRef.current = true;
    setThemeState(nextTheme);
    applyThemeClass(nextTheme);
    syncThemeColorMeta(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
