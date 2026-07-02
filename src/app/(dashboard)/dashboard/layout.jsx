import { SidebarProvider } from "../../../components/ui/sidebar";
import { TooltipProvider } from "../../../components/ui/tooltip";
import DashboardSidebar from "../../../pages/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <TooltipProvider>
        <SidebarProvider>
          <DashboardSidebar />

          <main className=" w-full">{children}</main>
        </SidebarProvider>
      </TooltipProvider>
    </section>
  );
}
