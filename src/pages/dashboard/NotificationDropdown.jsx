"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Building2,
  Briefcase,
  UserCheck,
} from "lucide-react";
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



export default function NotificationDropdown({ liveData = [] }) {
  const { data: session } = useSession();
  const userRole = session?.user?.role?.toLowerCase() || "seeker";
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (liveData.length > 0) {
      const lastSeenId = localStorage.getItem(
        `notifications_last_seen_${userRole}`,
      );
      const currentLatestId = liveData[0]?.id?.toString();

      if (lastSeenId !== currentLatestId) {
        setTimeout(() => {  setHasUnread(true) }, 0);
      } else {
        setTimeout(() => {  setHasUnread(false) }, 0); 
      }
    } else {
      setTimeout(() => {  setHasUnread(false) }, 0);
    }
  }, [liveData, userRole]);

  const notifications = liveData
    .map((item) => {
      let icon = Info;
      let iconColor = "text-indigo-500 bg-indigo-500/10";

      if (item.type === "application_status") {
        icon = UserCheck;
        iconColor = "text-emerald-500 bg-emerald-500/10";
      } else if (item.type === "application_received") {
        icon = Briefcase;
        iconColor = "text-sky-500 bg-sky-500/10";
      } else if (item.type === "pending_company") {
        icon = Building2;
        iconColor = "text-amber-500 bg-amber-500/10";
      }

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        time: item.time,
        icon,
        iconColor,
      };
    })
    .slice(0, 4);


  const badgeCount = notifications.length;

  const handleOpenChange = (open) => {
    if (open) {
      setHasUnread(false);
      if (liveData.length > 0) {
        const currentLatestId = liveData[0]?.id?.toString();
        if (currentLatestId) {
          localStorage.setItem(
            `notifications_last_seen_${userRole}`,
            currentLatestId,
          );
        }
      }
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Bell className="h-5 w-5" />
          {hasUnread && badgeCount > 0 && (
            <span className="absolute top-0 right-0 min-w-4.5 h-4.5 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1 ring-2 ring-background">
              {badgeCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 rounded-xl p-1 shadow-md"
      >
        <DropdownMenuLabel className="flex items-center justify-between px-3 py-2 text-xs font-semibold">
          <span>Notifications</span>
          {badgeCount > 0 && (
            <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize">
              {userRole} Stream Active
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground/30" />
              <span>No active architecture indicators.</span>
            </div>
          ) : (
            notifications.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors focus:bg-muted/60"
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${item.iconColor}`}
                  >
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
            })
          )}
        </div>

        <DropdownMenuSeparator />
        <div className="p-1">
          <Link
            href={"/dashboard/applications"}
            className="flex w-full h-8 items-center justify-center text-[11px] font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            View All Structural Nodes
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
