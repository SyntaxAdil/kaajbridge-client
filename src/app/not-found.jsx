// app/not-found.jsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-zinc-100 dark:from-[#0a0a0f] dark:via-zinc-950 dark:to-[#12121a] text-zinc-900 dark:text-white px-6 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-6"
      >
        {/* Floating Icon with Glowing Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
          className="size-20 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center shadow-2xl shadow-indigo-500/20 backdrop-blur-xl"
        >
          <Ghost className="size-10 text-indigo-600 dark:text-indigo-400 animate-bounce" />
        </motion.div>

        {/* 404 & Professional Text */}
        <div className="space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 backdrop-blur-xl"
          >
            Error 404 • Page Not Found
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-white"
          >
            Oops! The page you are looking for does not exist.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            It looks like you have followed a broken link or entered a URL that does not exist on KaajBridge. Let us get you back on track!
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all backdrop-blur-md shadow-sm cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Go Back</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}