"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  AlertTriangle,
  SearchIcon,
  Plus,
  Briefcase,
  MapPin,
  Calendar,
  Loader2,
  DollarSign,
  Building2,
  Layers,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { Checkbox } from "../../components/ui/checkbox";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { jobCreateSchema } from "../../schema/job-schema";
import JobCard from "./JobsCard";

const jobsMockData = [
  {
    title: "Frontend Developer (React)",
    company: "Vercel",
    location: "Remote",
    type: "full-time",
    experience: "entry",
    salary: {
      min: "40000",
      max: "60000",
      currency: "BDT"
    },
    status: "open",
    applicationDeadline: "2026-07-15",
    companyLogo: "",
    requirements: ["Git", "Basic Linux", "OOP"],
    skills: ["JavaScript", "React", "Tailwind CSS", "Next.js"],
    description: "We are looking for a passionate Frontend Developer who has deep familiarity with React.js, Tailwind CSS, and Next.js architectures."
  },
  {
    title: "Junior Software Engineer",
    company: "Enosis Solutions",
    location: "Dhaka, Bangladesh",
    type: "full-time",
    experience: "entry",
    salary: {
      min: "35000",
      max: "50000",
      currency: "BDT"
    },
    status: "open",
    applicationDeadline: "2026-06-30",
    companyLogo: "",
    requirements: ["Java", "SQL", "Problem Solving"],
    skills: ["Java", "Spring Boot", "MySQL"],
    description: "Join our development ecosystem to build scalable web enterprise systems. Perfect entry route for dedicated diploma holders."
  }
];
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

export default function MyJobsWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("experience", data.experience);
    formData.append("type", data.type);
    formData.append("salary[min]", data.salary.min);
    formData.append("salary[max]", data.salary.max);
    formData.append("salary[currency]", data.salary.currency);
    formData.append("description", data.description);

    const requirementsArray = data.requirements.split(",").map((r) => r.trim());
    const skillsArray = data.skills.split(",").map((s) => s.trim());
    formData.append("requirements", JSON.stringify(requirementsArray));
    formData.append("skills", JSON.stringify(skillsArray));

    formData.append("applicationDeadline", data.applicationDeadline);
    formData.append("status", data.status);
    formData.append("companyLogo", data.companyLogo || "");
    formData.append("termsAccepted", String(data.termsAccepted));

    console.log("FormData Submission Ready:", Object.fromEntries(formData));
    reset();
    setIsDialogOpen(false);
  };

  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-10 py-8">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ms-4 me-2" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manage Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Control your published configurations and engineering job boards.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72 lg:w-80 shrink-0">
          <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
            <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search job listings..."
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
            />
          </InputGroup>
        </div>
      </header>

      {/* Action Row */}
      <div className="flex items-center justify-between mb-7">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">
            {jobsMockData.length}
          </span>{" "}
          jobs scopes posted
        </p>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all duration-200">
              <Plus className="h-4 w-4 stroke-[2.5]" />
              Create Job Post
            </Button>
          </DialogTrigger>

          {/* Modal */}
          <DialogContent className="sm:max-w-[580px] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-0">
            {/* Sticky Modal Header */}
            <div className="sticky top-0 z-10 bg-card border-b border-border/60 px-7 pt-6 pb-5 rounded-t-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold tracking-tight">
                  Create New Job Post
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                  Publish targeted opportunities designated for engineering
                  professionals.
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
                  This platform is strictly dedicated to engineering ecosystems.
                  Any job posted here must be applicable and restricted only for
                  Diploma Engineering students or Diploma holders.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Basic Positions Info */}
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
                      placeholder="e.g. Dhaka, BD or Remote"
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

                {/* Salary Section */}
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

                {/* Core Framework Details */}
                <div className="space-y-4">
                  <SectionDivider label="Core Framework Details" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel required>
                        Requirements (Comma Separated)
                      </FormLabel>
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
                      placeholder="Describe the structural responsibilities and tactical execution items..."
                    />
                    <FieldError error={errors.description} />
                  </div>
                </div>

                {/* Verification Checkmark */}
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
                        I hereby confirm that this position is designated
                        exclusively for Diploma Engineering credentials.
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
      </div>

      {/* Job Post Cards Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobsMockData.map((job, index) => (
          <JobCard key={job._id || index} job={job}></JobCard>
        ))}
      </div>
    </section>
  );
}
