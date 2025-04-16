
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, PanelLeft, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home
    },
    {
      name: "Webpages",
      href: "/webpages",
      icon: Globe
    },
    {
      name: "Campaigns",
      href: "/campaigns",
      icon: PanelLeft
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings
    },
  ];

  return (
    <div className="w-64 h-screen bg-secondary border-r border-border flex flex-col">
      <div className="p-4 h-14 flex items-center border-b border-border">
        <h1 className="text-lg font-medium">UTM Customizer</h1>
      </div>
      <div className="flex-1 py-2 overflow-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md group",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
