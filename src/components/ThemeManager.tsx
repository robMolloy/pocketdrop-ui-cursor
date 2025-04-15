import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeManager() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both light and dark classes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      // Apply system theme
      root.classList.add(systemTheme);
    } else {
      // Apply selected theme
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
} 