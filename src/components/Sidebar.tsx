import { Button } from "@/components/ui/button";
import { Home, LogOut, Settings, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FileTree } from "./FileTree";
import React, { ReactNode } from "react";
import { pb } from "@/config/pocketbaseConfig";

const Wrapper = (p: { children: ReactNode; href?: string }) =>
  p.href ? <Link href={p.href}>{p.children}</Link> : p.children;

const SidebarButton = (p: {
  href?: string;
  Icon: typeof Home;
  children: ReactNode;
  isHighlighted: boolean;
  onClick?: () => void;
}) => {
  return (
    <Wrapper href={p.href}>
      <Button
        variant={p.isHighlighted ? "secondary" : "ghost"}
        className="w-full justify-start pl-6"
        onClick={p.onClick}
      >
        <p.Icon className="mr-2 h-4 w-4" />
        {p.children}
      </Button>
    </Wrapper>
  );
};

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={"flex h-full flex-col"}>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-1">
          <SidebarButton href="/" Icon={Home} isHighlighted={router.pathname === "/"}>
            Home
          </SidebarButton>
          <SidebarButton href="/starred" Icon={Star} isHighlighted={router.pathname === "/starred"}>
            Starred
          </SidebarButton>
          <FileTree />
        </div>
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
          <SidebarButton Icon={LogOut} isHighlighted={false} onClick={() => pb.authStore.clear()}>
            Log Out
          </SidebarButton>
        </div>
      </div>
    </div>
  );
}
