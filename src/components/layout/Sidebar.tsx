
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
    <div className="w-56 h-screen bg-sidebar border-r border-border flex flex-col">
      <div className="p-4 h-14 flex items-center border-b border-border">
        <h1 className="text-base font-medium text-sidebar-foreground">UTM Customizer</h1>
      </div>
      <div className="flex-1 py-4 overflow-auto">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-2 py-1.5 text-sm rounded-md group transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
