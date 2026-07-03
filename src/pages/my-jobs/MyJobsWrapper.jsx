import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInputStream from "./SearchInputStream";
import CreateJobModalWrapper from "./CreateJobModalWrapper";
import JobCard from "./JobsCard";

export default function MyJobsWrapper({ initialJobs, initialTotal, searchParams,myCompaniesName }) {
  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-10 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ms-4 me-2" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manage Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Control your published configurations and engineering job boards.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72 lg:w-80 shrink-0">
          <SearchInputStream initialValue={searchParams.search} />
        </div>
      </header>

      <div className="flex items-center justify-between mb-7">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">
            {initialTotal}
          </span>{" "}
          jobs scopes posted
        </p>

        <CreateJobModalWrapper myCompaniesName={myCompaniesName} />
      </div>

      {initialJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center  rounded-2xl bg-muted/5 max-w-md mx-auto my-4">
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            No Job Posts Found
          </h3>
          <p className="text-xs text-muted-foreground/70 mt-1.5 max-w-[280px] leading-relaxed">
            We couldn&apos;t find any job profiles matching your active system queries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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