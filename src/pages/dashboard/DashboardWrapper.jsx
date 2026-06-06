"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { Bell, SearchIcon } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useSession } from "../../lib/auth/auth-client";
import DashboardStatsGrid from "../../components/shared/StatsCard";
import { AnimatedThemeToggler } from "../../components/ui/animated-theme-toggler";
import RecentApplications from "./RecentApplications";
import TopCompanies from "./TopCompanies";
import { SidebarTrigger } from "../../components/ui/sidebar";

const DashboardWrapper = () => {
  const { data: session, refetch } = useSession();

  const userClient = session?.user;
  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  return (
    <section className="w-full">
      {/* searching and avatar for dashboard */}
      <header className="flex items-center justify-between w-full gap-8 border-b border-border bg-background  py-4 sticky top-0 z-50">
        <div className="flex-0 w-1 px-4" >
            <SidebarTrigger />
        </div>
        <div className=" flex-1">
          <InputGroup className="relative flex items-center bg-muted/40 rounded py-2 border border-border focus-within:border-primary/50 transition-colors">
            <InputGroupAddon className="pl-4 pr-1 text-muted-foreground/60">
              <SearchIcon className="h-4.5 w-4.5" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search applications, jobs, or talent..."
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-5 placeholder:text-muted-foreground/50 w-full"
            />
          </InputGroup>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <AnimatedThemeToggler 
          fromCenter
           className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" />
          <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1 ring-2 ring-background">
              0
            </span>
          </button>

          <div className="h-6 w-[1px] bg-border " />

          <div className="flex items-center gap-3.5">
            <div className="text-right hidden sm:block">
              <h1 className="text-sm font-semibold tracking-tight text-foreground leading-none">
                {userClient?.name}
              </h1>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                {userClient?.role}
              </p>
            </div>

            <Avatar className="h-[38px] w-[38px] ring-1 ring-border shadow-sm cursor-pointer">
              <AvatarImage
                src={userClient?.image}
                alt={userClient?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {userInitial || "RC"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* stats and title */}

      <main className="p-6">
        {/* welcome title */}
        <header>
          <h1 className="text-2xl font-semibold">
            Welcome Back, {userClient?.name}
          </h1>
        </header>
        {/* stats */}
        <div>
          <DashboardStatsGrid type="recruiter" />
        </div>


        {/* application table and my top companies  */}

        <div className="flex items-start mt-6 gap-4 flex-col md:flex-row " >
            <RecentApplications></RecentApplications>
            <TopCompanies></TopCompanies>
        </div>


      </main>
    </section>
  );
};

export default DashboardWrapper;
