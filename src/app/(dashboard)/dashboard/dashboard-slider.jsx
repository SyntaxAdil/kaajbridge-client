"use client";

import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  User2,
  Bookmark,
  Loader2,
  LogOut,
  PlusCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import toast from "react-hot-toast";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const roleMenus = {
  seeker: [
    { type: "label", title: "Overview" },
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Profile", icon: User2, href: "/dashboard/profile" },
    { type: "label", title: "Applications & Saves" },
    { title: "Saved Jobs", icon: Bookmark, href: "/dashboard/saved" },
    {
      title: "My Applications",
      icon: FileText,
      href: "/dashboard/applications",
    },
  ],
  recruiter: [
    { type: "label", title: "Overview" },
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Profile", icon: User2, href: "/dashboard/profile" },
    { type: "label", title: "Company Management" },
    {
      title: "Register Company",
      icon: PlusCircle,
      href: "/dashboard/my-companies/create",
    },
    { title: "My Companies", icon: Building2, href: "/dashboard/my-companies" },
    { type: "label", title: "Job Placements" },
    {
      title: "Post New Job",
      icon: PlusCircle,
      href: "/dashboard/my-jobs/create",
    },
    { title: "Manage Jobs", icon: Briefcase, href: "/dashboard/my-jobs" },
    { type: "label", title: "Applicants" },
    {
      title: "Applications Received",
      icon: FileText,
      href: "/dashboard/applications",
    },
  ],
  admin: [
    { type: "label", title: "Overview" },
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Profile Settings", icon: User2, href: "/dashboard/profile" },
    { type: "label", title: "Platform Core Management" },
    {
      title: "Manage Companies",
      icon: Building2,
      href: "/dashboard/my-companies",
    },
    { title: "Manage Jobs", icon: Briefcase, href: "/dashboard/my-jobs" },
    {
      title: "Manage Applications",
      icon: FileText,
      href: "/dashboard/applications",
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();
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

  const handleSignout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error("Signout error:", error);
      toast.error("Failed to logout");
    }
  };

  if (isPending) {
    return (
      <Sidebar
        collapsible="icon"
        className="border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-all duration-300"
    >
      <SidebarHeader
        className={`h-17.5 flex items-center border-b border-zinc-200 dark:border-zinc-800 transition-all ${
          isCollapsed ? "justify-center px-0" : "px-6 justify-between flex-row"
        }`}
      >
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                type="button"
                className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <PanelLeftOpen className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Link href="/">
              <Logo className="mt-2" />
            </Link>
            <button
              onClick={toggleSidebar}
              type="button"
              className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </>
        )}
      </SidebarHeader>

      {!isCollapsed && (
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-3 px-2">
            {userClient?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0">
                <Image
                  src={userClient.image}
                  alt={userClient?.name || "User Profile"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-700 shrink-0">
                <span className="text-white text-sm font-semibold">
                  {userInitial || "U"}
                </span>
              </div>
            )}
            <div className="overflow-hidden min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                {userClient?.name}
              </h3>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate capitalize block leading-tight mt-0.5 tracking-wide">
                {userClient?.role || "Job Seeker"}
              </span>
            </div>
          </div>
        </div>
      )}

      <SidebarContent
        className={`py-2 overflow-y-auto ${isCollapsed ? "px-2" : "px-4"}`}
      >
        <SidebarMenu className="gap-1.5">
          {menuItems.map((item, index) => {
            if (item.type === "label") {
              if (isCollapsed) return null;
              return (
                <span
                  key={`label-${index}`}
                  className="px-3 pt-4 pb-1 text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block select-none"
                >
                  {item.title}
                </span>
              );
            }

            const isActive = pathname === item.href;

            const menuContent = (
              <SidebarMenuButton
                className={`w-full flex items-center rounded-lg transition-colors duration-150 relative p-0
                  ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }
                  ${isCollapsed ? "justify-center h-10 w-10 mx-auto" : "h-10"}`}
              >
                <Link
                  href={item.href}
                  className={`w-full h-full flex items-center relative ${
                    isCollapsed ? "justify-center px-0" : "px-3 gap-3"
                  }`}
                >
                  <item.icon className="h-[17px] w-[17px] shrink-0" />
                  {!isCollapsed && (
                    <span className="text-[13px]">{item.title}</span>
                  )}
                </Link>
              </SidebarMenuButton>
            );

            if (isCollapsed) {
              return (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>{menuContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            }

            return <SidebarMenuItem key={item.title}>{menuContent}</SidebarMenuItem>;
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={`border-t border-zinc-200 dark:border-zinc-800 py-3 ${
          isCollapsed ? "px-2" : "px-4"
        }`}
      >
        <div
          className={`flex items-center mb-2 ${
            isCollapsed ? "flex-col gap-2" : "justify-between px-2"
          }`}
        >
          {!isCollapsed && (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Appearance
            </span>
          )}
          <AnimatedThemeToggler fromCenter />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    onClick={handleSignout}
                    className="w-full flex items-center rounded-lg text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors duration-150 p-0 justify-center h-10 w-10 mx-auto"
                  >
                    <div className="w-full h-full flex items-center justify-center px-0">
                      <LogOut className="h-[17px] w-[17px] shrink-0" />
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <SidebarMenuButton
                onClick={handleSignout}
                className="w-full flex items-center rounded-lg text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors duration-150 p-0 h-10"
              >
                <div className="w-full h-full flex items-center px-3 gap-3">
                  <LogOut className="h-[17px] w-[17px] shrink-0" />
                  <span className="text-[13px] font-medium">Logout</span>
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}