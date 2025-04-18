
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container py-6 px-8 max-w-[1000px] mx-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
