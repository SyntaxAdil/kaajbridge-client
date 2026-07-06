import React from "react";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth/auth";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";
import { SearchIcon } from "lucide-react";
import NotificationDropdown from "../../../pages/dashboard/NotificationDropdown";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import DashboardStatsGrid from "../../../components/shared/StatsCard";
import RecentApplications from "../../../pages/dashboard/RecentApplications";
import TopCompanies from "../../../pages/dashboard/TopCompanies";
import { applicationService } from "../../../services/applications";

export const metadata = {
  title: "Dashboard - KaajBridge",
};
const emptyResult = {
  data: [],
  pagination: { total: 0, page: 1, limit: 10, pages: 1 },
};
const DashboardPage = async () => {
  const sessionHeaders = await headers();
  const session = await auth.api.getSession({ headers: sessionHeaders });
  const userClient = session?.user;

  const role = userClient?.role;
  const userInitial = userClient?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  let initialApplications = [];

  try {
    if (role === "admin") {
      const res = await applicationService.getAllApplicationsAdmin({
        status: "",
        page: "1",
        limit: "5",
      });
      initialApplications = res?.data || [];
    } else if (role === "recruiter") {
      const res = await applicationService.getAllApplicationsForRecruiter({
        status: "",
        page: "1",
        limit: "5",
      });
      initialApplications = res?.data || [];
    } else if (role === "seeker") {
      const res = await applicationService.getMyApplications({
        status: "",
        page: "1",
        limit: "5",
      }).then((res) => res.data);
      
      initialApplications = res || [];
    }
  } catch (error) {
    console.error(error);
  }
  
  return (
    <section className="w-full">
      {/* searching and avatar for dashboard */}
      <header className="flex items-center justify-between w-full gap-8 border-b border-border bg-background  py-4 sticky top-0 z-50">
        <div className="flex-0 w-1 px-4">
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
          <NotificationDropdown></NotificationDropdown>

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

        <div className="flex items-start mt-6 gap-4 flex-col md:flex-row ">
          <RecentApplications applications={initialApplications} role={role} ></RecentApplications>
          {role !== "seeker" ? (
            <TopCompanies></TopCompanies>
          ) : (
            <h1>ApplicationChart</h1>
          )}
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;
