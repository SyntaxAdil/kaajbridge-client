"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, Building2, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { jobService } from "@/services/jobs";
import { jobCreateSchema } from "@/schema/job-schema";
import { FormLabel, FieldError, SectionDivider } from "./FormComponents";
import toast from "react-hot-toast";

export default function CreateJobForm({ myCompaniesName = [] }) {
  const [selectedLogo, setSelectedLogo] = useState("");
  const router = useRouter();
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      experience: "",
      type: "full-time",
      salary: { min: "", max: "", currency: "BDT" },
      requirements: "",
      skills: "",
      applicationDeadline: "",
      companyLogo: "",
      description: "",
      status: "open",
      termsAccepted: false,
    },
  });

  const handleCompanyChange = (companyName) => {
    setValue("company", companyName, { shouldValidate: true });
    const targetCompany = myCompaniesName.find((c) => c.name === companyName);
    if (targetCompany?.companyLogo) {
      setSelectedLogo(targetCompany.companyLogo);
      setValue("companyLogo", targetCompany.companyLogo, {
        shouldValidate: true,
      });
    } else {
      setSelectedLogo("");
      setValue("companyLogo", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const requirementsArray =
        typeof data.requirements === "string"
          ? data.requirements
              .split(",")
              .map((r) => r.trim())
              .filter(Boolean)
          : data.requirements;
      const skillsArray =
        typeof data.skills === "string"
          ? data.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
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
        companyLogo: data.companyLogo || selectedLogo || "",
        termsAccepted: data.termsAccepted,
      };

      await jobService.createJob(payload);
      reset();
      setSelectedLogo("");

      toast.success("Job created successfully");
      startTransition(() => {
        router.push("/dashboard/my-jobs");
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 pb-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/my-jobs")}
          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground shrink-0 border border-border/40"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Create New Job Post
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publish targeted opportunities designated for engineering
            professionals.
          </p>
        </div>
      </header>

      <Alert className="bg-amber-500/8 border border-amber-500/25 py-3 px-4 rounded-xl">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="font-semibold text-xs text-amber-600 ml-1">
          Important Notice / Caution
        </AlertTitle>
        <AlertDescription className="text-[11.5px] text-amber-600/80 mt-0.5 ml-1 leading-relaxed">
          This platform is strictly dedicated to engineering ecosystems. Any job
          posted here must be applicable and restricted only for Diploma
          Engineering students or Diploma holders.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <FormLabel required>Company</FormLabel>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCompanyChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                        <SelectValue placeholder="Select Company" />
                      </SelectTrigger>
                      <SelectContent>
                        {myCompaniesName.map((company) => (
                          <SelectItem key={company._id} value={company.name}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="h-10 w-10 shrink-0 border border-border/80 rounded-xl flex items-center justify-center bg-muted/40 overflow-hidden">
                {selectedLogo ? (
                  <Image
                    width={100}
                    height={100}
                    src={selectedLogo}
                    alt="Logo"
                    className="h-full w-full object-cover"
                    onError={() => setSelectedLogo("")}
                  />
                ) : (
                  <Building2 className="h-5 w-5 text-muted-foreground/70" />
                )}
              </div>
            </div>
            <FieldError error={errors.company} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            <FieldError error={errors.experience} />
          </div>
          <div>
            <FormLabel required>Job Type</FormLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            <FieldError error={errors.type} />
          </div>
        </div>

        <div className="space-y-3">
          <SectionDivider label="Salary Metrics" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
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
              <Controller
                name="salary.currency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">BDT (৳)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SectionDivider label="Core Framework Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              rows={4}
              className="resize-none rounded-xl p-3 text-sm leading-relaxed"
              placeholder="Describe the structural responsibilities..."
            />
            <FieldError error={errors.description} />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-start gap-3">
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-xs font-medium text-foreground cursor-pointer select-none"
              >
                I hereby confirm that this position is designated exclusively
                for Diploma Engineering credentials.
              </label>
            </div>
          </div>
          <FieldError error={errors.termsAccepted} />
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto h-11 rounded-xl font-semibold text-sm px-8 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              "Publish Job Scope"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
