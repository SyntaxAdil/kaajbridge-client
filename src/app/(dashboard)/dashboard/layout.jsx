import React from 'react';
import { SidebarProvider, SidebarInset, SidebarToggleButton } from '@/components/ui/sidebar';
import DashboardSidebar from '../../../pages/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset>
          <SidebarToggleButton></SidebarToggleButton>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}