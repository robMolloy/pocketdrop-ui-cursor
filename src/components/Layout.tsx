import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { Button } from "@/components/ui/button"
import { PanelRight } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <Header onOpenSidebar={() => {}} />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-background md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRightSidebarOpen(true)}
              >
                <PanelRight className="h-4 w-4 mr-2" />
                Open Sidebar
              </Button>
            </div>
            {children}
          </div>
        </main>
      </div>
      <RightSidebar
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
      />
    </div>
  )
} 