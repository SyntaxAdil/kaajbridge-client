import DashboardSidebar from "../../../components/dashboard/DashboardSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import { TooltipProvider } from "../../../components/ui/tooltip";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <main className="flex-1  mx-4 md:mx-0 "></main>
      <TooltipProvider>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarTrigger />
          <main className="mx-6 my-4">{children}</main>
        </SidebarProvider>
      </TooltipProvider>
    </section>
  );
}
