// components/home/FeaturedJobs.jsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import JobCard from "../my-jobs/JobsCard";
import { SectionHeader } from "../../components/ui/section-header";

export function FeaturedJobs({ initialJobs, initialTotalJobs }) {
  const jobs = initialJobs?.data ?? initialJobs ?? [];
  const totalJobs = initialTotalJobs ?? initialJobs?.totalJobs ?? jobs.length;

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0a0a0f]/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Latest Opportunities"
          subtitle="Jobs for You"
          title={`${totalJobs}+ Jobs Available`}
          description="Discover the latest tech roles from top companies hiring diploma engineers. Your dream job is just a click away."
          className="mb-10"
        />

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm">
            <Sparkles className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No jobs available yet</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Check back later for new opportunities</p>
          </div>
        )}

        {totalJobs > 4 && (
          <div className="flex justify-center mt-10">
            <Link href="/jobs">
              <Button
                variant="outline"
                className="group rounded-full px-8 py-6 text-sm font-medium border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200"
              >
                <span>View All Jobs</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedJobs;