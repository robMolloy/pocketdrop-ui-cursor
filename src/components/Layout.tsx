import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Header } from "./Header";
import { RightSidebar } from "./RightSidebar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: isOpen, open, close } = useRightSidebarStore();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header onOpenSidebar={() => {}} />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block h-[calc(100vh-3.5rem)]">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={open}>
                Open Sidebar
              </Button>
            </div>
            {children}
          </div>
        </main>
      </div>
      <RightSidebar isOpen={isOpen} onClose={close} />
    </div>
  );
}
