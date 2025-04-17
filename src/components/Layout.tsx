import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Header } from "./Header";
import { RightSidebar } from "./RightSidebar";
import { Sidebar } from "./Sidebar";

export function Layout(p: { children: React.ReactNode; showLeftSidebar: boolean }) {
  const { data: isOpen, close } = useRightSidebarStore();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {p.showLeftSidebar && (
          <aside className="hidden h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r bg-background md:block">
            <Sidebar />
          </aside>
        )}
        <main className="h-[calc(100vh-3.5rem)]">
          <div className={"flex h-full flex-col"}>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="p-6">{p.children}</div>
            </div>
          </div>
        </main>
      </div>
      <RightSidebar isOpen={isOpen} onClose={close} />
    </div>
  );
}
