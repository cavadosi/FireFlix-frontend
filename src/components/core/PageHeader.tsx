import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export function PageHeader({
  children,
  isCentered,
}: {
  children?: ReactNode;
  isCentered?: boolean;
}) {
  return (
    <header className="flex sticky top-0 z-50 h-16 shrink-0 items-center transition-[width,height] bg-gradient-to-b from-background to-transparent ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 gap-x-2">
      <SidebarTrigger className="flex  ml-2 md:ml-4" />
      <div className="flex-1 flex justify-center items-center mr-4">{children}</div>
      {isCentered && (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium [&_svg]:size-4 [&_svg]:shrink-0 h-7 w-7 mr-2 md:mr-4" />
      )}
    </header>
  );
}
