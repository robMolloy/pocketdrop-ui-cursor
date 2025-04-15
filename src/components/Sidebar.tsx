import { Button } from "@/components/ui/button";
import { Home, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

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
];

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable navigation section */}
      <div className="flex flex-col flex-1 overflow-y-auto p-2 gap-2">
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

      {/* Fixed bottom section */}
      <div className="border-t">
        <div className="flex flex-col gap-2 p-2">
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
