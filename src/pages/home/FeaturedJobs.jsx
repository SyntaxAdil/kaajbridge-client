// components/home/FeaturedJobs.jsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "../../components/ui/button";
import JobCard from "../my-jobs/JobsCard";
import { SectionHeader } from "../../components/ui/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function FeaturedJobs({ initialJobs, initialTotalJobs }) {
  const jobs = initialJobs?.data ?? initialJobs ?? [];
  const totalJobs = initialTotalJobs ?? initialJobs?.totalJobs ?? jobs.length;

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-zinc-50/50 via-zinc-50 dark:from-[#0a0a0f]/50 dark:via-[#0a0a0f] to-zinc-100/50 dark:to-[#0d0d14]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/5 dark:bg-purple-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            badge="Latest Opportunities"
            subtitle="Jobs for You"
            title={`${totalJobs}+ Jobs Available`}
            description="Discover the latest tech roles from top companies hiring diploma engineers. Your dream job is just a click away."
            className="mb-12 text-center"
          />
        </motion.div>

        {jobs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {jobs.map((job) => (
              <motion.div 
                key={job._id} 
                variants={itemVariants}
                className="h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-xl"
                >
                  <JobCard job={job} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">No jobs available right now</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
              We are updating our listings. Check back shortly for new career opportunities!
            </p>
          </motion.div>
        )}

        {totalJobs > 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Link href="/jobs">
              <Button
                variant="outline"
                className="group relative inline-flex items-center gap-3 rounded-full px-8 py-6 text-sm font-semibold border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 text-zinc-800 dark:text-zinc-200 transition-all duration-300"
              >
                <span>Explore All Jobs</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedJobs;