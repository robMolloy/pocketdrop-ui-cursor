import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Header } from "./Header";
import { RightSidebar } from "./RightSidebar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: isOpen, close } = useRightSidebarStore();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden h-[calc(100vh-3.5rem)] w-64 border-r bg-background md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
      <RightSidebar isOpen={isOpen} onClose={close} />
    </div>
  );
}
