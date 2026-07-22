import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Briefcase,
  DollarSign,
  CalendarClock,
  FileText,
} from "lucide-react";

const statusStyles = {
  accepted: "text-emerald-600 border-emerald-500/25 bg-emerald-500/8",
  rejected: "text-rose-600 border-rose-500/25 bg-rose-500/8",
  reviewed: "text-blue-600 border-blue-500/25 bg-blue-500/8",
  shortlisted: "text-indigo-600 border-indigo-500/25 bg-indigo-500/8",
  interviewing: "text-purple-600 border-purple-500/25 bg-purple-500/8",
  pending: "text-amber-600 border-amber-500/25 bg-amber-500/8",
};

export default async function ApplicationViewModal({ applicationId }) {
  if (!applicationId) return null;

  let application = null;

  try {
    const response = await fetch(`/api/applications/${applicationId}`);
    const data = await response.json().catch(() => null);
    application = data?.data || null;
  } catch (error) {
    console.error(error);
  }

  if (!application) return null;

  const {
    applicant,
    applicantInfo,
    job,
    resume,
    coverLetter,
    status,
    experience,
    expectedSalary,
    appliedAt,
  } = application;

  const person = applicantInfo || applicant || {};
  const currentStatus = status?.toLowerCase() || "pending";
  const initials = person?.name
    ? person.name.substring(0, 2).toUpperCase()
    : "NA";

  const formattedSalary = expectedSalary
    ? typeof expectedSalary === "object"
      ? Object.values(expectedSalary).filter(Boolean).join(" - ")
      : expectedSalary
    : "Not specified";

  const formattedDate = appliedAt
    ? new Date(appliedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[520px] rounded-2xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="border-b border-border/60 px-6 pt-5 pb-4 bg-muted/20 flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight text-foreground">
            Application details
          </h2>
          <Link
            href="?"
            scroll={false}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            Close
          </Link>
        </div>

        <div className="p-6 space-y-5 text-sm max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-lg border border-border">
              {person?.image ? (
                <AvatarImage src={person.image} alt={person.name} />
              ) : null}
              <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-bold text-foreground truncate">
                {person?.name || "Unknown applicant"}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                <Mail className="h-3 w-3 shrink-0" />
                {person?.email || "No email"}
              </p>
            </div>
            <Badge
              className={`${statusStyles[currentStatus] || statusStyles.pending} ml-auto rounded-full uppercase tracking-wide text-[10px] font-bold px-2.5 py-0.5 border shrink-0`}
            >
              {currentStatus}
            </Badge>
          </div>

          <div className="rounded-xl border border-border/60 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" /> Position
            </div>
            <p className="font-semibold text-foreground">
              {job?.title || "Untitled role"}
            </p>
            <p className="text-xs text-muted-foreground">
              {job?.company || "Unknown company"} ·{" "}
              {job?.location || "Location not specified"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/60 p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                <Briefcase className="h-3 w-3" /> Experience
              </div>
              <p className="text-sm font-semibold text-foreground capitalize">
                {experience || "N/A"}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                <DollarSign className="h-3 w-3" /> Expected salary
              </div>
              <p className="text-sm font-semibold text-foreground">
                {formattedSalary}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <FileText className="h-3 w-3" /> Cover letter
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
              {coverLetter || "No cover letter provided."}
            </p>
          </div>

          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-border/60 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <FileText className="h-4 w-4" /> View resume
            </a>
          )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <CalendarClock className="h-3.5 w-3.5" /> Applied on {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
