"use client";

import React from "react";
import {
  FileText,
  Users,
  Zap,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Clock,
  ShieldAlert,
} from "lucide-react";

function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="w-full rounded-2xl border  bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md group">
      <div className="flex flex-col gap-5 ">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/40 text-muted-foreground  group-hover:bg-accent group-hover:text-foreground transition-colors duration-200">
            <Icon className="h-5 w-5 stroke-[1.8] " />
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

export default function DashboardStatsGrid({ type = "recruiter" }) {
  const statsConfig = {
    recruiter: [
      { title: "Total Job Posts", value: "48", icon: FileText },
      { title: "Total Applicants", value: "1,284", icon: Users },
      { title: "Active Jobs", value: "18", icon: Zap },
      { title: "Jobs Closed", value: "32", icon: CheckCircle2 },
    ],
    seeker: [
      { title: "Applied Jobs", value: "24", icon: Briefcase },
      { title: "Interviews Scheduled", value: "3", icon: Clock },
      { title: "Courses Completed", value: "7", icon: GraduationCap },
      { title: "Profile Views", value: "142", icon: Users },
    ],
    admin: [
      { title: "Total Users", value: "14,250", icon: Users },
      { title: "Active Subscriptions", value: "340", icon: Zap },
      { title: "Pending Reports", value: "5", icon: ShieldAlert },
      { title: "System Health", value: "99.2%", icon: CheckCircle2 },
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
