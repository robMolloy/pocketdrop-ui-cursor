import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeToggle() {
  const themeStore = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={themeStore.cycleTheme}
      title={
        themeStore.data === "light"
          ? "Light mode"
          : themeStore.data === "dark"
            ? "Dark mode"
            : "System theme"
      }
    >
      {(() => {
        const Comp =
          themeStore.data === "light" ? Sun : themeStore.data === "dark" ? Moon : Monitor;
        return <Comp className="h-[1.2rem] w-[1.2rem]" />;
      })()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
