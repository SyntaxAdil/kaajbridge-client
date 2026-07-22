"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Briefcase,
  GraduationCap,
  Rocket,
  ArrowUpRight,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { NumberTicker } from "@/components/ui/number-ticker";

const Banner = ({ initialStats }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    totalCompanies: initialStats?.totalCompanies ?? 500,
    totalJobs: initialStats?.totalJobs ?? 2400,
  };

  const popularSkills = [
    "React", "Python", "Java", "MERN",
    "Frontend", "Backend", "Full Stack", "DevOps"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/jobs`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSkillClick = (skill) => {
    router.push(`/jobs?search=${encodeURIComponent(skill)}`);
  };

  return (
    <section className="relative -mt-18 pt-10 min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white">
      {/* ── PARTICLES BACKGROUND ── */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={50}
        staticity={50}
        ease={40}
        size={0.5}
        color="#818cf8"
        vx={0.2}
        vy={0.1}
        refresh={false}
      />

      {/* ── CENTERED CONTENT ── */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            {[
              { icon: Briefcase, label: "BD Tech Jobs" },
              { icon: GraduationCap, label: "Diploma Engineers" },
              { icon: Rocket, label: "Fast Hiring" },
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/40 dark:border-indigo-500/20 bg-white/70 dark:bg-white/5 px-3.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300 backdrop-blur-sm shadow-sm dark:shadow-none"
              >
                <item.icon className="size-3.5 text-indigo-500 dark:text-indigo-400" />
                {item.label}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Diploma Engineers
              </span>
            </h1>
            <p className="mt-3 text-lg font-light text-slate-600 dark:text-zinc-400 sm:text-xl">
              Your gateway to <span className="text-indigo-600 dark:text-indigo-400 font-medium">tech careers in Bangladesh</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-zinc-400 sm:text-base max-w-2xl mx-auto"
          >
            Curated job portfolios and fast-track hiring pipelines connecting you to top
            local and international companies.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 w-full max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-indigo-200/30 dark:border-indigo-500/20 bg-white/90 dark:bg-white/5 p-1.5 shadow-sm shadow-indigo-100/50 dark:shadow-none backdrop-blur-xl">
              <div className="flex flex-1 items-center gap-3 rounded-full px-4 py-2">
                <Search className="size-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs, skills, or companies..."
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-6 py-2 text-sm font-medium text-white transition-all active:scale-95 shadow-sm shadow-indigo-500/30 dark:shadow-lg dark:shadow-indigo-600/30"
              >
                Find Jobs
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </motion.div>

          {/* Quick search tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-1.5"
          >
            <span className="text-xs text-slate-400 dark:text-zinc-500 mr-1">Popular:</span>
            {popularSkills.slice(0, 6).map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillClick(skill)}
                className="rounded-full px-2.5 py-0.5 text-xs text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-indigo-200/30 dark:hover:border-indigo-500/20"
              >
                {skill}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Building2 className="size-4 text-indigo-400 dark:text-indigo-500" />
                <div className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
                  <NumberTicker value={stats.totalCompanies} />+
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-zinc-500">Total Companies</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Users className="size-4 text-indigo-400 dark:text-indigo-500" />
                <div className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
                  <NumberTicker value={stats.totalJobs} />
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-zinc-500">Total Jobs</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500 dark:text-emerald-400" />
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                  <NumberTicker value={100} />%
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-zinc-500">Verified Jobs</div>
            </div>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
            <span>Trusted by 1000+ engineers across Bangladesh</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;