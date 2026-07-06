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
import ApplicationChart from "../../../pages/dashboard/ApplicationChart";

export const metadata = {
  title: "Dashboard - KaajBridge",
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
  let statsData = {
    totalCount: 0,
    interviewCount: 0,
    shortlistedCount: 0,
    extraCount: 0,
  };

  // // Live Data Pipeline Matrix
  let serverNotifications = [];
  
  try {
    if (role === "admin") {
      const appRes = await applicationService.getAllApplicationsAdmin({ page: "1", limit: "5" });
      initialApplications = appRes?.data || [];
      statsData.totalCount = appRes?.pagination?.total || initialApplications.length;

      // Real Data Mapping: dynamically map pending system events from database array if applicable
      serverNotifications = initialApplications.map((app) => ({
        id: app._id,
        title: `Verification Request Queue`,
        description: `Ecosystem configuration review needed for application token node ID: ${app._id.slice(-6)}`,
        time: new Date(app.createdAt).toLocaleDateString(),
        type: "pending_company",
      }));

    } else if (role === "recruiter") {
      const appRes = await applicationService.getAllApplicationsForRecruiter({ page: "1", limit: "5" });
      initialApplications = appRes?.data || [];
      statsData.totalCount = appRes?.pagination?.total || initialApplications.length;

      serverNotifications = initialApplications.map((app) => ({
        id: app._id,
        title: `Inbound Packets Generated`,
        description: `${app.applicant?.name} successfully deployed a resume package for ${app.job?.title || "MERN Position"}.`,
        time: new Date(app.createdAt).toLocaleDateString(),
        type: "application_received",
      }));

    } else if (role === "seeker") {
      const appRes = await applicationService.getMyApplications({ page: "1", limit: "100" });
      const allData = appRes?.data || [];
      initialApplications = allData.slice(0, 5);

      statsData.totalCount = appRes?.pagination?.total || allData.length;
      statsData.interviewCount = allData.filter(app => app?.status?.toLowerCase() === "interviewing").length;
      statsData.shortlistedCount = allData.filter(app => app?.status?.toLowerCase() === "shortlisted").length;

      serverNotifications = allData.slice(0, 3).map((app) => ({
        id: app._id,
        title: `Status Flow Changed`,
        description: `Your application node for ${app?.job?.title || "Developer Target"} status is pipeline configured to: ${app?.status?.toUpperCase()}`,
        time: new Date(app.updatedAt || app.createdAt).toLocaleDateString(),
        type: "application_status",
      }));
    }
  } catch (error) {
    console.error("Dashboard Global Fetch System Crash:", error);
  }

  return (
    <section className="w-full">
      <header className="flex items-center justify-between w-full gap-8 border-b border-border bg-background py-4 sticky top-0 z-50">
        <div className="flex-0 w-1 px-4">
          <SidebarTrigger />
        </div>
        
        {/* // Dynamic Application Searching Grid */}
        <div className="flex-1">
          <form action={role === "seeker" ? "/dashboard/applications" : role === "recruiter" ? "/dashboard/all-job-applications" : "/dashboard/admin/all"} method="GET">
            <InputGroup className="relative flex items-center bg-muted/40 rounded py-2 border border-border focus-within:border-primary/50 transition-colors">
              <InputGroupAddon className="pl-4 pr-1 text-muted-foreground/60">
                <SearchIcon className="h-4.5 w-4.5" />
              </InputGroupAddon>
              <InputGroupInput
                name={role === "seeker" ? "status" : "jobId"}
                placeholder={
                  role === "admin"
                    ? "Search deployment logs via global Job ID parameter..."
                    : role === "recruiter"
                      ? "Search inbound talent pipelines via Job ID target..."
                      : "Search dynamic applications metrics by entering structural state (pending, interviewing)..."
                }
                className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-5 placeholder:text-muted-foreground/50 w-full"
              />
            </InputGroup>
          </form>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <NotificationDropdown liveData={serverNotifications} />

          <div className="h-6 w-[1px] bg-border" />

          <div className="flex items-center gap-3.5">
            <div className="text-right hidden sm:block">
              <h1 className="text-sm font-semibold tracking-tight text-foreground leading-none">
                {userClient?.name}
              </h1>
              <p className="text-xs text-muted-foreground font-medium mt-1 capitalize">
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
                {userInitial || "KB"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="p-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back, {userClient?.name}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {role === "admin" && "Ecosystem monitoring, structural logs configuration, and permission panels control overview."}
            {role === "recruiter" && "Track incoming engineering packages, post empty slots, and verify structural portfolios."}
            {role === "seeker" && "Review sent packages, track application milestones, and match platform opportunities."}
          </p>
        </header>

        <div>
          <DashboardStatsGrid type={role} serverStats={statsData} />
        </div>
        <div className="flex items-start mt-6 gap-4 flex-col md:flex-row">
          <RecentApplications applications={initialApplications} role={role} />
          {role !== "seeker" ? <TopCompanies /> : <ApplicationChart />}
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;