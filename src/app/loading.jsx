import { Loader2, Briefcase } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full bg-indigo-500/20 animate-ping" />
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner relative z-10">
            <Briefcase className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
              Kaaj<span className="text-indigo-600 dark:text-indigo-400">Bridge</span>
            </span>
            <Loader2 className="h-4 w-4 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Bridging Careers...
          </p>
        </div>
      </div>
    </div>
  );
}