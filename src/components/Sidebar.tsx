import { Button } from "@/components/ui/button";
import { Home, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FileTree } from "./FileTree";

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={"flex h-full flex-col"}>
      {/* Scrollable navigation section */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-1">
          <Link href="/">
            <Button
              variant={router.pathname === "/" ? "secondary" : "ghost"}
              className="w-full justify-start pl-6"
            >
              <Home />
              Home
            </Button>
          </Link>
          <Link href="/users">
            <Button
              variant={router.pathname === "/users" ? "secondary" : "ghost"}
              className="w-full justify-start pl-6"
            >
              <Users />
              Users
            </Button>
          </Link>
          <FileTree />
        </div>

        {/* File Tree Section */}
      </div>

      {/* Fixed bottom section */}
      <div className="border-t p-4">
        <div className="flex flex-col gap-2">
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
