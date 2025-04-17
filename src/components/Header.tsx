import { Cloud } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 flex-1 items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Cloud className="h-5 w-5" />
          <span className="font-bold">PocketDrop</span>
        </Link>
        <nav className="flex items-center space-x-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
