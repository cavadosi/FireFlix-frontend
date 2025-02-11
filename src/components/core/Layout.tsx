import { AppSidebar } from "@/components/core/sidebar/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  navigation?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
