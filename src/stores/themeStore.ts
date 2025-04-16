import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";

type TState = "dark" | "light" | "system";

interface ThemeState {
  data: TState;
  setData: (data: TState) => void;
}

const useInitThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      data: "dark",
      setData: (data) => set({ data }),
    }),
    {
      name: "pocketdrop-theme",
    }
  )
);

function useThemeStoreSideEffect() {
  const theme = useInitThemeStore((state) => state.data);

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

export const useThemeStore = () => {
  const initThemeStore = useInitThemeStore();

  return { ...initThemeStore, useThemeStoreSideEffect };
};
