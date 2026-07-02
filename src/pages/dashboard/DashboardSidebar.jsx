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
  User2,
  Bookmark,
  CreditCard,
  Loader2,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { handleSignout, useSession } from "../../lib/auth/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const roleMenus = {
  seeker: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Profile", icon: User2, href: "/dashboard/profile" },
    { title: "Saved Jobs", icon: Bookmark, href: "/dashboard/saved" },
    { title: "My Applications", icon: FileText, href: "/dashboard/applications" },
    { title: "Billing & Plans", icon: CreditCard, href: "/dashboard/billing" },
  ],
  recruiter: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Profile", icon: User2, href: "/dashboard/profile" },
    { title: "My Company", icon: Building2, href: "/dashboard/my-companies" },
    { title: "Manage Jobs", icon: Briefcase, href: "/dashboard/my-jobs" },
    { title: "Applications", icon: FileText, href: "/dashboard/applications" },
  ],
  admin: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Profile Settings", icon: User2, href: "/dashboard/profile" },
    { title: "Manage Companies", icon: Building2, href: "/dashboard/my-companies" },
    { title: "Manage Jobs", icon: Briefcase, href: "/dashboard/my-jobs" },
    { title: "Applications", icon: FileText, href: "/dashboard/applications" },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { data: session, isPending } = useSession();
  const userClient = session?.user;
  const userRole = userClient?.role?.toLowerCase() || "seeker";

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    }
  }, [session, isPending, router]);

  const menuItems = roleMenus[userRole] || roleMenus.seeker;

  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  if (isPending) {
    return (
      <Sidebar collapsible="icon" className="border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
        </div>
      </Sidebar>
    );
  }

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
            {userInitial || "K"}
          </div>
        )}
      </SidebarHeader>

      {!isCollapsed && (
        <div className="px-6 py-4 flex flex-col gap-3.5 transition-all duration-200">
          <div className="flex items-center gap-3">
            {userClient?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                <Image
                  src={userClient.image}
                  alt={userClient?.name || "User Profile"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                <User2 className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div className="overflow-hidden">
              <h3 className="text-sm font-semibold tracking-tight text-foreground truncate leading-none">
                {userClient?.name}
              </h3>
              <span className="text-xs text-muted-foreground mt-1 block truncate capitalize font-medium">
                {userClient?.role || "Job Seeker"}
              </span>
            </div>
          </div>
        </div>
      )}

      <SidebarContent className={`mt-4 ${isCollapsed ? "px-1.5" : "px-3"}`}>
        <SidebarMenu className="gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`w-full flex items-center py-4 rounded-md transition-all duration-200 relative group
                    ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    } 
                    ${isCollapsed ? "justify-center px-0 h-12 w-12 mx-auto" : "px-4 gap-4"}`}
                >
                  <Link
                    href={item.href}
                    className="w-full h-full flex items-center justify-stretch"
                  >
                    <div
                      className={`flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isCollapsed ? "w-full" : ""}`}
                    >
                      <item.icon
                        className={`h-[22px] w-[22px] shrink-0 transition-colors
                          ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                      />
                    </div>

                    {!isCollapsed && (
                      <span className="text-sm tracking-wide transition-opacity duration-200">
                        {item.title}
                      </span>
                    )}

                    {isActive && !isCollapsed && (
                      <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-l-md" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={`mb-2 ${isCollapsed ? "px-1.5" : "px-3"}`}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignout}
              tooltip="Logout"
              className={`w-full flex items-center py-4 rounded-md transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                ${isCollapsed ? "justify-center px-0 h-12 w-12 mx-auto" : "px-4 gap-4"}`}
            >
              <div className={`flex items-center justify-center ${isCollapsed ? "w-full" : ""}`}>
                <LogOut className="h-[22px] w-[22px] shrink-0 text-muted-foreground group-hover:text-foreground" />
              </div>
              {!isCollapsed && (
                <span className="text-sm tracking-wide text-muted-foreground group-hover:text-foreground">
                  Logout
                </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}