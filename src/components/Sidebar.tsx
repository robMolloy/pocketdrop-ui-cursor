import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Settings, Users } from "lucide-react"
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
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
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
      </div>
    </div>
  )
} 