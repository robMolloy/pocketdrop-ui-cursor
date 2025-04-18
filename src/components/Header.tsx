import { Cloud, Upload } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { FileUploader } from "@/modules/files/FileUploader";
import { useState } from "react";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { RightSidebarContent } from "./RightSidebar";

export function Header() {
  const router = useRouter();
  const isBrowsePage = router.pathname.startsWith("/browse");
  const [isOpen, setIsOpen] = useState(false);

  const rightSidebarStore = useRightSidebarStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 flex-1 items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Cloud className="h-5 w-5" />
          <span className="font-bold">PocketDrop</span>
        </Link>
        <nav className="flex items-center space-x-2">
          {isBrowsePage && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() =>
                rightSidebarStore.setData(
                  <RightSidebarContent title="Upload Files">
                    <FileUploader currentPath={""} onUploadComplete={() => {}} />
                  </RightSidebarContent>,
                )
              }
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
