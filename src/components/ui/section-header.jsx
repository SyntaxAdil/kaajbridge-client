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
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-3.5 relative z-10 w-full", alignClasses[align], className)}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.6, ease: "backOut" }}
          className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-400 backdrop-blur-xl shadow-lg shadow-indigo-500/10"
        >
          {badge}
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-widest bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl leading-[1.12]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400 font-normal"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}