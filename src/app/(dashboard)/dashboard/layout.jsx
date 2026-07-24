import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard-slider";
import { TooltipProvider } from "../../../components/ui/tooltip";

const DashboardLayout = ({ children }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <header className="md:hidden flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-background py-2.5  ">
              <SidebarTrigger className="md:hidden" />
              <span className="md:hidden ml-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Dashboard
              </span>
            </header>
            <main className="px-4  bg-background">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;