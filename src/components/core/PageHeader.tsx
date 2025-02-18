import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export function PageHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="flex sticky top-0 z-50 h-16 shrink-0 items-center transition-[width,height] bg-gradient-to-b from-background to-transparent ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <SidebarTrigger className="ml-4" />
      <div className="flex-1 flex justify-center">{children}</div>
      <div className="h-7 w-7 mr-4" />
    </header>
  );
}
