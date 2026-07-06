"use client";

import React from "react";
import {
  FileText,
  Users,
  Zap,
  CheckCircle2,
  Briefcase,
  Clock,
  ShieldAlert,
  Building2,
  UserCheck
} from "lucide-react";

function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="w-full rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md group">
      <div className="flex flex-col gap-5">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/40 text-muted-foreground group-hover:bg-accent group-hover:text-foreground transition-colors duration-200">
            <Icon className="h-5 w-5 stroke-[1.8]" />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
            {title}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function DashboardStatsGrid({ type = "seeker", serverStats }) {
  const statsConfig = {
    recruiter: [
      { title: "Total Job Posts", value: serverStats?.totalJobPosts ?? 0, icon: FileText },
      { title: "Total Applicants", value: serverStats?.totalApplicants ?? 0, icon: Users },
      { title: "Active Jobs", value: serverStats?.activeJobs ?? 0, icon: Zap },
      { title: "Applications Processed", value: serverStats?.applicationsProcessed ?? 0, icon: CheckCircle2 },
    ],
    seeker: [
      { title: "Applied Jobs", value: serverStats?.totalCount ?? 0, icon: Briefcase },
      { title: "Interview Stage", value: serverStats?.interviewCount ?? 0, icon: Clock },
      { title: "Shortlisted Positions", value: serverStats?.shortlistedCount ?? 0, icon: UserCheck },
      { title: "Available Openings", value: serverStats?.availableOpenings ?? 0, icon: Building2 },
    ],
    admin: [
      { title: "Total Talent Pool", value: serverStats?.totalTalentPool ?? 0, icon: Users },
      { title: "Corporate Partners", value: serverStats?.corporatePartners ?? 0, icon: Building2 },
      { title: "Pending Verifications", value: serverStats?.pendingVerifications ?? 0, icon: ShieldAlert },
      { title: "Total Job Matches", value: serverStats?.totalCount ?? 0, icon: Zap },
    ],
  };

  const currentStats = statsConfig[type] || statsConfig.recruiter;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full my-4">
      {currentStats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}