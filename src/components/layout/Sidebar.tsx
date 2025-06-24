
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
    <div className="w-[180px] h-screen flex flex-col justify-center pl-4">
      <nav className="space-y-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center text-[15px] transition-colors hover:text-black",
              location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                ? "text-black font-bold"
                : "text-gray-500"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
