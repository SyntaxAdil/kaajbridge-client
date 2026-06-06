"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../../components/ui/Logo";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  Settings,
  User,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "../../lib/auth/auth-client";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, isActive: true ,href:"/dashboard" },
  { title: "My Company", icon: Building2, isActive: false ,href:"/dashboard/my-companies" },
  { title: "Manage Jobs", icon: Briefcase, isActive: false,href:"/dashboard/my-jobs" },
  { title: "Applications", icon: FileText, isActive: false,href:"/dashboard/applications" },
  { title: "Settings", icon: Settings, isActive: false ,href:"/dashboard/settings" },
];

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { data: session, isPending } = useSession();

  const userClient = session?.user;
  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out"
    >
      <SidebarHeader
        className={`py-5 flex items-center transition-all ${isCollapsed ? "justify-center px-0" : "px-6"}`}
      >
        {!isCollapsed ? (
          <Logo />
        ) : (
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-lg shadow-sm">
            {userInitial}
          </div>
        )}
      </SidebarHeader>

      {!isCollapsed && (
        <div className="px-6 py-4 flex flex-col gap-3.5 transition-all duration-200">
          {isPending ? (
            <Loader2 className="animate-spin"></Loader2>
          ) : (
            <div className="flex items-center gap-3">
              {userClient?.image ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                  <Image
                    src={userClient?.image || null}
                    alt={userClient?.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-border bg-muted shrink-0 ">
                  <User />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold tracking-tight text-foreground truncate leading-none">
                  {userClient?.name}
                </h3>
                <span className="text-xs text-muted-foreground mt-1 block truncate capitalize">
                  {userClient?.role}
                </span>
              </div>
            </div>
          )}
          {/* <div>
            <span className="inline-flex items-center bg-secondary text-[10px] font-bold text-secondary-foreground px-2.5 py-1 rounded-md tracking-wider uppercase border border-border shadow-sm">
              Premium Account
            </span>
          </div> */}
        </div>
      )}

      <SidebarContent className={`mt-4 ${isCollapsed ? "px-1.5" : "px-3"}`}>
        <SidebarMenu className="gap-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`w-full flex items-center py-4 rounded-md transition-all duration-200 relative group
                  ${
                    item.isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  } 
                  ${isCollapsed ? "justify-center px-0 h-20 w-12 mx-auto" : "px-4 gap-4"}`}
              >
                <Link
                  href={`${item.href}`}
                  className="w-full h-full flex items-center justify-stretch"
                >
                  <div
                    className={`flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isCollapsed ? "w-full" : ""}`}
                  >
                    <item.icon
                      className={`h-[22px] w-[22px] shrink-0 transition-colors
                        ${item.isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                  </div>

                  {!isCollapsed && (
                    <span className="text-sm tracking-wide transition-opacity duration-200">
                      {item.title}
                    </span>
                  )}

                  {item.isActive && !isCollapsed && (
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-l-md" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
