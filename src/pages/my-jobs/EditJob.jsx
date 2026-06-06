"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../components/ui/select";

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

export default function EditJobPostModal({ isOpen, setIsOpen, job, onUpdate }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      title: job?.title || "",
      company: job?.company || "",
      description: job?.description || "",
      location: job?.location || "",
      experience: job?.experience || "entry",
      type: job?.type || "full-time",
      salary: {
        min: job?.salary?.min || "",
        max: job?.salary?.max || "",
        currency: job?.salary?.currency || "BDT",
      },
      requirements: Array.isArray(job?.requirements)
        ? job.requirements.join(", ")
        : job?.requirements || "",
      skills: Array.isArray(job?.skills)
        ? job.skills.join(", ")
        : job?.skills || "",
      applicationDeadline: job?.applicationDeadline || job?.deadline || "",
      companyLogo: job?.companyLogo || job?.logo || "",
      status: job?.status || "open",
    },
  });

  const onEditSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        requirements: data.requirements.split(",").map((r) => r.trim()),
        skills: data.skills.split(",").map((s) => s.trim()),
      };

      if (onUpdate) {
        await onUpdate(job?._id || job?.id, formattedData);
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[580px] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-0">
        <div className="sticky top-0 z-10 bg-card border-b border-border/60 px-7 pt-6 pb-5 rounded-t-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-tight">
              Modify Job Post
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
              Update the specifications, criteria, and operational metadata for this job listing.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onEditSubmit)} className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Job Title</FormLabel>
              <Input {...register("title")} className="h-10 rounded-xl text-sm" />
              <FieldError error={errors.title} />
            </div>
            <div>
              <FormLabel required>Company Name</FormLabel>
              <Input {...register("company")} className="h-10 rounded-xl text-sm" />
              <FieldError error={errors.company} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <FormLabel required>Location</FormLabel>
              <Input {...register("location")} className="h-10 rounded-xl text-sm" />
              <FieldError error={errors.location} />
            </div>
            <div>
              <FormLabel required>Experience Level</FormLabel>
              <Select
                value={job?.experience || "entry"}
                onValueChange={(v) => setValue("experience", v, { shouldValidate: true })}
              >
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
                value={job?.type || "full-time"}
                onValueChange={(v) => setValue("type", v, { shouldValidate: true })}
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

          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <FormLabel required>Min Salary</FormLabel>
              <Input
                type="number"
                {...register("salary.min")}
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.salary?.min} />
            </div>
            <div>
              <FormLabel required>Max Salary</FormLabel>
              <Input
                type="number"
                {...register("salary.max")}
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.salary?.max} />
            </div>
            <div>
              <FormLabel required>Currency</FormLabel>
              <Select
                value={job?.salary?.currency || "BDT"}
                onValueChange={(v) => setValue("salary.currency", v, { shouldValidate: true })}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Requirements (Comma Separated)</FormLabel>
              <Input {...register("requirements")} className="h-10 rounded-xl text-sm" />
              <FieldError error={errors.requirements} />
            </div>
            <div>
              <FormLabel required>Skills (Comma Separated)</FormLabel>
              <Input {...register("skills")} className="h-10 rounded-xl text-sm" />
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
              <Input {...register("companyLogo")} className="h-10 rounded-xl text-sm" />
              <FieldError error={errors.companyLogo} />
            </div>
          </div>

          <div>
            <FormLabel required>Job Description</FormLabel>
            <Textarea
              {...register("description")}
              rows={3}
              className="resize-none rounded-xl p-3 text-sm leading-relaxed"
            />
            <FieldError error={errors.description} />
          </div>

          <div>
            <FormLabel required>System Status</FormLabel>
            <Select
              value={job?.status || "open"}
              onValueChange={(v) => setValue("status", v, { shouldValidate: true })}
            >
              <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open / Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <FieldError error={errors.status} />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-xl text-sm font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-xl text-sm font-semibold min-w-[140px]"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}