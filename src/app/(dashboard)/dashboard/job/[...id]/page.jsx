import React from "react";
import Link from "next/link";
import Image from "next/image";
import { jobService } from "../../../../../services/jobs";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ApplyButtonClient from "./ApplyButtonClient";

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await jobService.getJobById(id).then((res) => res.data);

  const formattedDeadline = new Date(job.applicationDeadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link 
          href="/jobs" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Go to Explore Jobs
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-b from-card to-card/50 p-6 md:p-8 shadow-sm backdrop-blur-sm">
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border border-border/60 bg-background flex items-center justify-center shadow-sm shrink-0">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  fill
                  className="object-cover p-2"
                />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground/40" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="capitalize text-[11px] font-medium rounded-md px-2 py-0.5">
                  {job.type}
                </Badge>
                <Badge variant="outline" className="capitalize text-[11px] font-medium rounded-md px-2 py-0.5">
                  {job.experience} Level
                </Badge>
                {job.status === "open" ? (
                  <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 capitalize text-[11px] font-bold rounded-md px-2 py-0.5 border-none">
                    {job.status}
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="capitalize text-[11px] font-bold rounded-md px-2 py-0.5">
                    {job.status}
                  </Badge>
                )}
              </div>

              <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-foreground">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-muted-foreground/70" /> {job.company}
                </span>
                <span className="flex items-center gap-1.5 capitalize">
                  <MapPin className="h-4 w-4 text-muted-foreground/70" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground/70" /> Full-time Network
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
            <ApplyButtonClient jobId={id} jobStatus={job.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              Job Description
            </h2>
            <Separator className="bg-border/60" />
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {job.description || "No description provided for this pipeline platform setup."}
            </p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Requirements
              </h2>
              <Separator className="bg-border/60" />
              <ul className="space-y-2.5">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Core Competencies & Skills
              </h2>
              <Separator className="bg-border/60" />
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-muted/60 hover:bg-muted font-medium text-xs rounded-lg px-3 py-1 text-muted-foreground border border-border/40"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Job Summary
            </h2>
            <Separator className="bg-border/60" />
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Salary Scope</span>
                  <span className="text-sm font-semibold text-foreground">
                    {job.salary?.min}k - {job.salary?.max}k {job.salary?.currency || "EUR"} <span className="text-xs font-normal text-muted-foreground">/ year</span>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Application Deadline</span>
                  <span className="text-sm font-semibold text-foreground">
                    {formattedDeadline}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Experience Standard</span>
                  <span className="text-sm font-semibold text-foreground capitalize">
                    {job.experience} Specialist
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Verification Note</h4>
              <p className="text-[11px] text-amber-700/80 dark:text-amber-500/80 leading-normal">
                This verification space is designated specifically for Diploma Engineering network pipelines. Ensure credentials match requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}