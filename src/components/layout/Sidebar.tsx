
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
    <div className="w-[220px] h-screen bg-[#f7f6f3] border-r border-[#ebebea] flex flex-col">
      <div className="p-3 h-[45px] flex items-center border-b border-[#ebebea]">
        <h1 className="text-[14px] font-medium text-[#37352f] ml-2">UTM Customizer</h1>
      </div>
      <div className="flex-1 py-1 overflow-auto">
        <nav className="px-1 space-y-[1px]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-2 py-[5px] text-[14px] rounded-[3px] group transition-colors",
                location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                  ? "bg-[#e8e7e4] text-[#37352f] font-medium"
                  : "text-[#6b6b68] hover:bg-[#efefef]"
              )}
            >
              <item.icon className="mr-1 h-[16px] w-[16px]" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
