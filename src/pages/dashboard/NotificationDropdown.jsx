"use client";

import React from "react";
import { Bell, CheckCircle2, AlertCircle, Info, Building2, Briefcase, UserCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "../../lib/auth/auth-client";

const ROLE_NOTIFICATIONS = {
  seeker: [
    {
      id: "s1",
      title: "Application Shortlisted",
      description: "Your profile has been shortlisted for the Frontend Engineer position.",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      id: "s2",
      title: "New Job Match",
      description: "A new structural engineering role matching your profile has been posted.",
      time: "5 hours ago",
      icon: Briefcase,
      iconColor: "text-indigo-500 bg-indigo-500/10",
    },
    {
      id: "s3",
      title: "Profile View",
      description: "An HR manager from Spice & Co reviewed your uploaded resume.",
      time: "1 day ago",
      icon: UserCheck,
      iconColor: "text-sky-500 bg-sky-500/10",
    },
  ],
  recruiter: [
    {
      id: "r1",
      title: "New Application Received",
      description: "A candidate applied for the Lead MERN Stack Developer opening.",
      time: "10 mins ago",
      icon: Briefcase,
      iconColor: "text-indigo-500 bg-indigo-500/10",
    },
    {
      id: "r2",
      title: "Workspace Verified",
      description: "Your company profile setup has been reviewed and officially verified.",
      time: "3 hours ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      id: "r3",
      title: "Action Required",
      description: "Complete your pending job placement details to publish the live board.",
      time: "1 day ago",
      icon: AlertCircle,
      iconColor: "text-amber-500 bg-amber-500/10",
    },
  ],
  admin: [
    {
      id: "a1",
      title: "New Company Pending",
      description: "KaajBridge Network requires system approval to initialize workspace.",
      time: "5 mins ago",
      icon: Building2,
      iconColor: "text-amber-500 bg-amber-500/10",
    },
    {
      id: "a2",
      title: "System Performance",
      description: "Global job discovery filters and auth token processes are fully nominal.",
      time: "4 hours ago",
      icon: Info,
      iconColor: "text-indigo-500 bg-indigo-500/10",
    },
    {
      id: "a3",
      title: "Global Audit Log",
      description: "3 new high-priority updates deployed to the structural database pipelines.",
      time: "12 hours ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10",
    },
  ],
};

const ROLE_VIEW_ALL_LINKS = {
  seeker: "/dashboard/applications",
  recruiter: "/dashboard/applications",
  admin: "/dashboard/my-companies",
};

export default function NotificationDropdown() {
  const { data: session } = useSession();
  const userRole = session?.user?.role?.toLowerCase() || "seeker";

  const notifications = ROLE_NOTIFICATIONS[userRole] || ROLE_NOTIFICATIONS.seeker;
  const viewAllHref = ROLE_VIEW_ALL_LINKS[userRole] || ROLE_VIEW_ALL_LINKS.seeker;
  const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 min-w-4.5 h-4.5 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1 ring-2 ring-background">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 rounded-xl p-1 shadow-md">
        <DropdownMenuLabel className="flex items-center justify-between px-3 py-2 text-xs font-semibold">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize">
              {userRole} Updates
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors focus:bg-muted/60"
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${item.iconColor}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-xs font-semibold truncate text-foreground">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-normal break-words">
                    {item.description}
                  </p>
                  <span className="text-[10px] text-muted-foreground/50 mt-1">
                    {item.time}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />
        <div className="p-1">
          <Link
            href={viewAllHref}
            className="flex w-full h-8 items-center justify-center text-[11px] font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            View All Updates
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}