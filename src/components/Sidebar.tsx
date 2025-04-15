import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Settings, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/users",
      label: "Users",
      icon: Users,
    },
  ]

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Scrollable navigation section */}
      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <div className="px-3 py-2">
        {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={router.pathname === route.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Button>
              </Link>
            ))}
        </div>
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
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
} 