import { Cloud } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 flex-1 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          <span className="font-bold">PocketDrop</span>
        </div>
        <nav className="flex items-center space-x-2">
          <ThemeToggle />
        </nav>
        {/* <div className="flex  items-center">
        </div> */}
      </div>
    </header>
  );
}
