// app/privacy/page.jsx
import React from "react";
import { ShieldCheck, GraduationCap, Lock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Privacy Policy & Terms | KaajBridge",
  description: "Terms of service and privacy guidelines for KaajBridge - exclusive platform for diploma engineers.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Legal & Guidelines
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Terms & Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Card */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl">
          <CardContent className="p-6 sm:p-10 space-y-8 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                1. Exclusive Eligibility (Diploma Holder Requirement)
              </h2>
              <p>
                KaajBridge is a specialized career ecosystem designed exclusively for diploma engineers. To register, apply for jobs, and access specialized features on this platform, <strong className="text-zinc-900 dark:text-zinc-100">users must hold a valid Diploma in Engineering or equivalent technical degree</strong>. Providing false academic credentials may result in permanent suspension of your account.
              </p>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-indigo-500" />
                2. Terms of Service
              </h2>
              <p className="mb-2">
                By accessing and using KaajBridge, you agree to comply with and be bound by the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
                <li>You will maintain the confidentiality of your account credentials.</li>
                <li>All resume details and employment histories submitted must be authentic.</li>
                <li>Employers and recruiters using the platform must verify their company credentials before hiring talent.</li>
              </ul>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-indigo-500" />
                3. Privacy & Data Protection
              </h2>
              <p>
                We respect your personal privacy. Your data (including contact details, academic records, and career preferences) is securely stored and only shared with verified hiring partners on KaajBridge to facilitate employment opportunities. We never sell or trade your data to third-party marketing agencies.
              </p>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                4. Modifications to Terms
              </h2>
              <p>
                KaajBridge reserves the right to modify these terms at any time. Continued use of the platform after updates indicates your acceptance of the revised terms and guidelines.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}