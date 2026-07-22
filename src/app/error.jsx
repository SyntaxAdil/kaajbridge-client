// app/error.jsx
"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white px-6 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-red-600/10 blur-[140px]" />
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-6"
      >
        {/* Floating Error Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
          className="size-20 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center justify-center shadow-2xl shadow-red-500/20 backdrop-blur-xl"
        >
          <AlertTriangle className="size-10 text-red-400 animate-pulse" />
        </motion.div>

        {/* Error Details & Context */}
        <div className="space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-red-400 backdrop-blur-xl"
          >
            System Error • Application Crash
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white"
          >
            Kichu ekta gormil hoyese! 🚨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            Server ba client side-e unexpected error generate hoise. Ghabraneo kichu nai, abar try kore dekhte paren.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <motion.button
            onClick={() => reset()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <RefreshCcw className="size-4" />
            <span>Try Again</span>
          </motion.button>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all backdrop-blur-md cursor-pointer"
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}