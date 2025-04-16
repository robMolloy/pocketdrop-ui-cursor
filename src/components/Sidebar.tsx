import { Button } from "@/components/ui/button";
import { Home, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FileTree } from "./FileTree";
import React, { ReactNode } from "react";

const SidebarButton = (p: {
  href?: string;
  Icon: typeof Home;
  children: ReactNode;
  isHighlighted: boolean;
}) => {
  const Wrapper = (p2: { children: ReactNode }) =>
    p.href ? <Link href={p.href}>{p2.children}</Link> : p2.children;
  return (
    <>
      <Wrapper>
        <Button
          variant={p.isHighlighted ? "secondary" : "ghost"}
          className="w-full justify-start pl-6"
        >
          <p.Icon className="mr-2 h-4 w-4" />
          {p.children}
        </Button>
      </Wrapper>
    </>
  );
};

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={"flex h-full flex-col"}>
      {/* Scrollable navigation section */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-1">
          <SidebarButton href="/" Icon={Home} isHighlighted={router.pathname === "/"}>
            Home
          </SidebarButton>
          <SidebarButton href="/users" Icon={Users} isHighlighted={router.pathname === "/users"}>
            Users
          </SidebarButton>
          <FileTree />
        </div>

        {/* File Tree Section */}
      </div>

      {/* Fixed bottom section */}
      <div className="border-t p-4">
        <div className="flex flex-col gap-2">
          <SidebarButton
            href="/settings"
            Icon={Settings}
            isHighlighted={router.pathname === "/settings"}
          >
            Settings
          </SidebarButton>
          <SidebarButton Icon={LogOut} isHighlighted={false}>
            Log Out
          </SidebarButton>
          {/* <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button> */}
        </div>
      </div>
    </div>
  );
}
