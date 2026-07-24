"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchInputStream from "./SearchInputStream";
import JobCard from "./JobsCard";
import { SidebarTrigger } from "../../components/ui/sidebar";

// ✅ Main component wrapped with Suspense
export default function MyJobsWrapper(props) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <MyJobsWrapperContent {...props} />
    </Suspense>
  );
}

function MyJobsWrapperContent({ initialJobs = [], initialTotal = 0, searchParams = {} }) {
  const searchValue = searchParams?.search || "";

  return (
    <section className="w-full min-h-screen bg-background py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mx-2" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manage Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Control your published configurations and engineering job boards.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72 lg:w-80 shrink-0 px-2">
          <SearchInputStream initialValue={searchValue} />
        </div>
      </header>

      <div className="flex items-center justify-between mb-7 px-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">
            {initialTotal}
          </span>{" "}
          jobs scopes posted
        </p>

        <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all duration-200">
          <Link href="/dashboard/my-jobs/create">
            <Plus className="h-4 w-4 stroke-[2.5]" />
            Create Job Post
          </Link>
        </Button>
      </div>

      {initialJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-muted/5 max-w-md mx-auto my-4">
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            No Job Posts Found
          </h3>
          <p className="text-xs text-muted-foreground/70 mt-1.5 max-w-[280px] leading-relaxed">
            We couldn&apos;t find any job profiles matching your active system queries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
          {initialJobs.map((job) => (
            <JobCard 
              key={job._id} 
              job={job} 
              isRecruiter={true} 
            />
          ))}
        </div>
      )}
    </section>
  );
}