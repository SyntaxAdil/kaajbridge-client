// components/ui/section-header.jsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  align = "center",
  badge,
  icon: Icon,
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-4 relative z-10 w-full", alignClasses[align], className)}
    >
      {(badge || Icon) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 backdrop-blur-xl shadow-sm"
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />}
          {badge && <span className="uppercase tracking-wider">{badge}</span>}
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl max-w-3xl leading-[1.12]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeader;