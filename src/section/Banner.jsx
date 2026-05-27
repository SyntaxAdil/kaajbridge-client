"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";
import { cn } from "../lib/utils";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
} from "lucide-react";
import Link from "next/link";

/* ── Stat Pill ── */
const StatPill = ({ icon: Icon, label, value, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "absolute hidden lg:flex items-center gap-2.5 rounded-2xl border backdrop-blur-xl px-4 py-2.5 shadow-sm",
      "border-gray-200 bg-white/70 text-gray-900",
      "dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-black/20",
      className
    )}
  >
    <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-500/10">
      <Icon className="size-4 text-indigo-500" />
    </span>
    <div>
      <p className="text-[11px] font-medium text-gray-500 dark:text-zinc-400 leading-none mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 leading-none">
        {value}
      </p>
    </div>
  </motion.div>
);

/* ── Tag ── */
const Tag = ({ children, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, ease: "backOut" }}
    className="
      inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest
      border-indigo-200 bg-indigo-50 text-indigo-600
      dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-400
    "
  >
    <Sparkles className="size-3" />
    {children}
  </motion.span>
);

const Banner = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ySmooth = useSpring(yContent, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={ref}
      className="
        relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden 
        bg-white text-gray-900
        dark:bg-zinc-950 dark:text-white
      "
    >
      {/* grid */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full opacity-20 dark:opacity-40"
        )}
        width={40}
        height={40}
        x={-1}
        y={-1}
      />

      {/* glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-indigo-200/40 dark:bg-indigo-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-100/60 dark:bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[400px] rounded-full bg-blue-100/50 dark:bg-indigo-700/10 blur-[100px]" />
      </div>

      {/* noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* stats */}
      <StatPill
        icon={TrendingUp}
        label="New jobs this month"
        value="50,000+"
        delay={0.9}
        className="top-[22%] left-[7%]"
      />
      <StatPill
        icon={Building2}
        label="Partner companies"
        value="12,000+"
        delay={1.05}
        className="top-[34%] right-[6%]"
      />
      <StatPill
        icon={Users}
        label="Hired this year"
        value="180,000+"
        delay={1.2}
        className="bottom-[28%] left-[9%]"
      />

      {/* content */}
      <motion.div
        style={{ y: ySmooth, opacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center"
      >
        <Tag delay={0.2}>50,000+ new jobs this month</Tag>

        {/* headline */}
        <motion.h1
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          Find Your{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Dream Job
            </span>
          </span>{" "}
          Today
        </motion.h1>

        {/* text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-zinc-400 sm:text-lg"
        >
          KaajBridge connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link href="/jobs">
            <motion.button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-600/30">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              Browse Jobs
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link href="/company">
            <motion.button className="rounded-xl border px-7 py-3.5 text-sm font-semibold transition-colors
              border-gray-200 bg-white text-gray-700 hover:bg-gray-50
              dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10
            ">
              Explore Companies
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-zinc-950 dark:to-transparent" />
    </section>
  );
};

export default Banner;