// app/billing/page.jsx
import Link from "next/link";
import { CreditCard, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white px-6 py-16 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-indigo-600/15 blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
        {/* Floating Icon Badge */}
        <div className="size-20 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
          <CreditCard className="size-10 text-indigo-400" />
        </div>

        {/* Header & Status Tag */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-400 backdrop-blur-xl">
            <Sparkles className="size-3.5" /> Billing & Subscriptions Status
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            Notun notun site banaisi, ekoni joid billing lage eta toh mushkil! 😅
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
            Billing will be officially on after reaching <strong className="text-indigo-400 font-bold">20 successfully hired</strong> from our website. Till then, enjoy free posting! 🎉
          </p>
        </div>

        {/* Feature Highlights Box */}
        <div className="w-full p-6 rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-2xl shadow-xl flex flex-col gap-4 text-left my-2">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Zap className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Free Job Posting Active</h3>
              <p className="text-xs text-zinc-400">Post unlimited tech & engineering listings without paying a dime.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zero Hidden Charges</h3>
              <p className="text-xs text-zinc-400">No credit card required until our milestone target is achieved.</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 cursor-pointer">
              <span>Explore Dashboard & Post Jobs</span>
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}