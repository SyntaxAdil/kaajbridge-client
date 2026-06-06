"use client";

import React from "react";

import { Building2, Layers, Cpu, Radio } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const companiesData = [
  {
    name: "Google Inc.",
    category: "Technology",
    location: "Mountain View",
    jobsCount: "24",
    icon: Cpu,
  },
  {
    name: "Meta Platforms",
    category: "Social Media",
    location: "Menlo Park",
    jobsCount: "18",
    icon: Layers,
  },
  {
    name: "Stripe",
    category: "Fintech",
    location: "San Francisco",
    jobsCount: "12",
    icon: Radio,
  },
  {
    name: "Tesla",
    category: "Automotive",
    location: "Austin",
    jobsCount: "31",
    icon: Building2,
  },
];

export default function TopCompanies() {
  return (
    <div className="w-full lg:w-[400px] bg-card rounded-2xl border border-border p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            My Top Companies
          </h2>
          <Link href={"/dashboard/my-companies"} className="text-muted-foreground text-sm p-0 h-auto hover:text-foreground">
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-5 mb-6">
          {companiesData.map((company) => {
            const IconComponent = company.icon;
            return (
              <div key={company.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-xl bg-muted/60 border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <IconComponent className="h-5 w-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground tracking-tight leading-none mb-1.5">
                      {company.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                      {company.category} • {company.location}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-base font-bold text-foreground block leading-none mb-1">
                    {company.jobsCount}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">
                    Active Jobs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link href={"/dashboard/my-companies"}  className="w-full py-5 rounded-xl border-border bg-muted/20 hover:bg-muted/50 text-foreground font-medium text-sm transition-colors mt-2 text-center">
        View All Companies
      </Link>
    </div>
  );
}