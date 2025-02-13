import { ThemeSwitch } from "./ThemeSwitch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export function PageHeader({children}: {children?: ReactNode}) {
  return (
    <header className="flex sticky top-0 z-50 h-16 shrink-0 items-center gap-2 transition-[width,height] bg-gradient-to-b from-background to-transparent   ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 justify-between w-full ">
        <SidebarTrigger className="-ml-1" />
        {children}
        <ThemeSwitch />
      </div>
    </header>
  );
}
