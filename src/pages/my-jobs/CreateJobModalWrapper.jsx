"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { jobService } from "../../services/jobs";
import { jobCreateSchema } from "../../schema/job-schema";


function FormLabel({ children, required }) {
  return (
    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-[11px] text-red-500 mt-1">{error.message}</p>;
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}

export default function CreateJobModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      type: "full-time",
      salary: { currency: "BDT" },
      status: "open",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const requirementsArray = typeof data.requirements === "string" 
        ? data.requirements.split(",").map((r) => r.trim()) 
        : data.requirements;
      const skillsArray = typeof data.skills === "string" 
        ? data.skills.split(",").map((s) => s.trim()) 
        : data.skills;

      const payload = {
        title: data.title,
        company: data.company,
        location: data.location,
        experience: data.experience,
        type: data.type,
        salary: {
          min: Number(data.salary.min),
          max: Number(data.salary.max),
          currency: data.salary.currency,
        },
        description: data.description,
        requirements: requirementsArray,
        skills: skillsArray,
        applicationDeadline: data.applicationDeadline,
        status: data.status,
        companyLogo: data.companyLogo || "",
        termsAccepted: data.termsAccepted,
      };

      await jobService.createJob(payload);
      reset();
      setIsOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Submission operational failure:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all duration-200">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          Create Job Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[580px] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-0">
        <div className="sticky top-0 z-10 bg-card border-b border-border/60 px-7 pt-6 pb-5 rounded-t-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-tight">
              Create New Job Post
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
              Publish targeted opportunities designated for engineering professionals.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-7 pt-5 pb-7">
          <Alert className="bg-amber-500/8 border border-amber-500/25 py-3 px-4 mb-6 rounded-xl">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="font-semibold text-xs text-amber-600 ml-1">
              Important Notice / Caution
            </AlertTitle>
            <AlertDescription className="text-[11.5px] text-amber-600/80 mt-0.5 ml-1 leading-relaxed">
              This platform is strictly dedicated to engineering ecosystems. Any job posted here must be applicable and restricted only for Diploma Engineering students or Diploma holders.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel required>Job Title</FormLabel>
                <Input
                  {...register("title")}
                  placeholder="e.g. Frontend Developer"
                  className="h-10 rounded-xl text-sm"
                />
                <FieldError error={errors.title} />
              </div>
              <div>
                <FormLabel required>Company Name</FormLabel>
                <Input
                  {...register("company")}
                  placeholder="e.g. Vercel"
                  className="h-10 rounded-xl text-sm"
                />
                <FieldError error={errors.company} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <FormLabel required>Location</FormLabel>
                <Input
                  {...register("location")}
                  placeholder="e.g. Dhaka, BD"
                  className="h-10 rounded-xl text-sm"
                />
                <FieldError error={errors.location} />
              </div>
              <div>
                <FormLabel required>Experience Level</FormLabel>
                <Select onValueChange={(v) => setValue("experience", v)}>
                  <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead Level</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError error={errors.experience} />
              </div>
              <div>
                <FormLabel required>Job Type</FormLabel>
                <Select
                  defaultValue="full-time"
                  onValueChange={(v) => setValue("type", v)}
                >
                  <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError error={errors.type} />
              </div>
            </div>

            <div className="space-y-3">
              <SectionDivider label="Salary Metrics" />
              <div className="grid grid-cols-3 gap-4 items-end">
                <div>
                  <FormLabel required>Min Salary</FormLabel>
                  <Input
                    type="number"
                    {...register("salary.min")}
                    placeholder="0"
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.salary?.min} />
                </div>
                <div>
                  <FormLabel required>Max Salary</FormLabel>
                  <Input
                    type="number"
                    {...register("salary.max")}
                    placeholder="0"
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.salary?.max} />
                </div>
                <div>
                  <FormLabel required>Currency</FormLabel>
                  <Select
                    defaultValue="BDT"
                    onValueChange={(v) => setValue("salary.currency", v)}
                  >
                    <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">BDT (৳)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <SectionDivider label="Core Framework Details" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel required>Requirements (Comma Separated)</FormLabel>
                  <Input
                    {...register("requirements")}
                    placeholder="Git, Basic Linux, OOP"
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.requirements} />
                </div>
                <div>
                  <FormLabel required>Skills (Comma Separated)</FormLabel>
                  <Input
                    {...register("skills")}
                    placeholder="JavaScript, React, Tailwind"
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.skills} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel required>Application Deadline</FormLabel>
                  <Input
                    type="date"
                    {...register("applicationDeadline")}
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.applicationDeadline} />
                </div>
                <div>
                  <FormLabel>Company Logo URL</FormLabel>
                  <Input
                    {...register("companyLogo")}
                    placeholder="https://example.com/logo.png"
                    className="h-10 rounded-xl text-sm"
                  />
                  <FieldError error={errors.companyLogo} />
                </div>
              </div>

              <div>
                <FormLabel required>Job Description</FormLabel>
                <Textarea
                  {...register("description")}
                  rows={3}
                  className="resize-none rounded-xl p-3 text-sm leading-relaxed"
                  placeholder="Describe the structural responsibilities..."
                />
                <FieldError error={errors.description} />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  onCheckedChange={(checked) =>
                    setValue("termsAccepted", checked === true)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium text-foreground cursor-pointer select-none"
                  >
                    I hereby confirm that this position is designated exclusively for Diploma Engineering credentials.
                  </label>
                </div>
              </div>
              <FieldError error={errors.termsAccepted} />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Publishing Job...
                  </>
                ) : (
                  "Publish Job Scope"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}