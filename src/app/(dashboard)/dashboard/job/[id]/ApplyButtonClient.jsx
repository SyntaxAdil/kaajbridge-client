"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Send, ChevronRight, ChevronLeft, CheckCircle2, FileText, Link, GraduationCap, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { applicationService } from "../../../../../services/applications";

export default function ApplyButtonClient({ job, user, initialHasApplied }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isApplying, setIsApplying] = useState(false);

  const jobId = job?._id || job?.id;
  const isAlreadyAppliedInUserArray = user?.applications?.some(appId => appId === jobId);
  const [hasApplied, setHasApplied] = useState(initialHasApplied || isAlreadyAppliedInUserArray);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resumeType: user?.resumeLink ? "existing" : "new",
      resumeLink: user?.resumeLink || "",
      experience: "",
      expectedSalary: "",
      coverLetter: "",
      termsAccepted: false,
    },
  });

  const watchResumeType = watch("resumeType");
  const watchAllFields = watch();

  const isClosed = job?.status !== "open";
  const isNotSeeker = user?.role === "recruiter" || user?.role === "admin";

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger("resumeLink");
      if (!isValid) return toast.error("Please provide a valid resume link URL");
    }
    if (step === 2) {
      const isValid = await trigger(["experience", "expectedSalary"]);
      if (!isValid) return toast.error("Please fill in all the required fields");
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    if (!data.termsAccepted) {
      return toast.error("You must confirm your student status & agree to terms.");
    }

    setIsApplying(true);
    try {
      const payload = {
        job: jobId,
        recruiterId: job?.recruiterId,
        resume: data.resumeLink,
        coverLetter: data.coverLetter || undefined,
        experience: data.experience,
        expectedSalary: {
          amount: Number(data.expectedSalary),
          currency: "BDT",
        },
        termsAccepted: data.termsAccepted,
      };

      await applicationService.postApplication(payload);
      setHasApplied(true);
      setIsOpen(false);
      setIsSuccessOpen(true);
      toast.success("Application submitted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Already applied or system submission timeout error.");
    } finally {
      setIsApplying(false);
    }
  };

  if (isNotSeeker) {
    return (
      <Button disabled className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-sm bg-muted text-muted-foreground border border-border/40">
        Only for Job Seekers
      </Button>
    );
  }

  if (isClosed) {
    return (
      <Button disabled className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-sm bg-muted text-muted-foreground border border-border/40">
        Position Closed
      </Button>
    );
  }

  if (hasApplied) {
    return (
      <Button disabled className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-sm bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
        <CheckCircle2 className="h-4 w-4 mr-2" />
        Applied
      </Button>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) { setStep(1); reset(); } }}>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm gap-2">
            Apply For Job
            <Send className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[480px] rounded-2xl border-border bg-card p-6">
          <DialogHeader className="pb-4 border-b border-border/50">
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Job Application Setup
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Step {step} of 3 — Fill your structural profile details to forward to HR.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-4">
            
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Select Presentation Resume</Label>
                  <RadioGroup
                    value={watchResumeType}
                    onValueChange={(value) => {
                      setValue("resumeType", value);
                      setValue("resumeLink", value === "existing" ? user?.resumeLink || "" : "");
                    }}
                    className="grid grid-cols-1 gap-2.5 pt-1"
                  >
                    {user?.resumeLink && (
                      <Label className="flex items-start gap-3 rounded-xl border border-border/70 p-3.5 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value="existing" id="existing" className="mt-0.5" />
                        <div className="flex-1 space-y-0.5">
                          <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                            <FileText className="h-3.5 w-3.5 text-primary" /> Use Saved Profile Resume
                          </span>
                          <span className="text-[11px] text-muted-foreground block truncate max-w-[340px]">
                            {user.resumeLink}
                          </span>
                        </div>
                      </Label>
                    )}
                    <Label className="flex items-start gap-3 rounded-xl border border-border/70 p-3.5 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="new" id="new" className="mt-0.5" />
                      <div className="flex-1 space-y-0.5">
                        <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                          <Link className="h-3.5 w-3.5 text-primary" /> Provide New External Link
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          Submit a fresh portfolio or cloud doc share asset.
                        </span>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {watchResumeType === "new" && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-200">
                    <Label htmlFor="resumeLink" className="text-xs font-bold text-muted-foreground">Document Cloud URL</Label>
                    <Input
                      id="resumeLink"
                      type="url"
                      placeholder="https://drive.google.com/file/d/..."
                      className={`h-10 rounded-xl bg-muted/20 border-border/75 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-1 ${errors.resumeLink ? 'border-destructive' : ''}`}
                      {...register("resumeLink", { required: "Resume link is required" })}
                    />
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button type="button" onClick={nextStep} className="h-10 px-5 rounded-xl text-xs font-bold gap-1.5">
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="experience" className="text-xs font-bold text-muted-foreground">Professional Experience</Label>
                    <Select
                      value={watchAllFields.experience}
                      onValueChange={(value) => setValue("experience", value, { shouldValidate: true })}
                    >
                      <SelectTrigger id="experience" className={`h-10 rounded-xl bg-muted/20 border-border/75 text-sm focus:ring-1 ${errors.experience ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border bg-card">
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register("experience", { required: true })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="expectedSalary" className="text-xs font-bold text-muted-foreground">Expected Salary (BDT)</Label>
                    <Input
                      id="expectedSalary"
                      type="number"
                      placeholder="e.g. 35000"
                      className={`h-10 rounded-xl bg-muted/20 border-border/75 text-sm focus-visible:ring-1 ${errors.expectedSalary ? 'border-destructive' : ''}`}
                      {...register("expectedSalary", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="coverLetter" className="text-xs font-bold text-muted-foreground">Cover Letter Statement (Optional)</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Express why your core engineering skills match the job expectations..."
                    className="min-h-[100px] rounded-xl bg-muted/20 border-border/75 text-sm placeholder:text-muted-foreground/40 focus-visible:ring-1 resize-none"
                    {...register("coverLetter")}
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="ghost" onClick={prevStep} className="h-10 px-4 rounded-xl text-xs font-semibold gap-1.5 text-muted-foreground">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep} className="h-10 px-5 rounded-xl text-xs font-bold gap-1.5">
                    Review Package
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div className="rounded-xl border border-border/60 bg-muted/10 divide-y divide-border/50 text-xs overflow-hidden">
                  <div className="p-3 bg-muted/30">
                    <span className="font-bold block text-muted-foreground uppercase tracking-wider text-[10px]">Verification Target Resume Link</span>
                    <p className="text-foreground font-medium mt-1 truncate max-w-[380px]">{watchAllFields.resumeLink || "None Provided"}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border/50">
                    <div className="p-3">
                      <span className="font-bold block text-muted-foreground uppercase tracking-wider text-[10px]">Total Experience</span>
                      <p className="text-foreground font-medium mt-0.5 capitalize">{watchAllFields.experience || "N/A"}</p>
                    </div>
                    <div className="p-3">
                      <span className="font-bold block text-muted-foreground uppercase tracking-wider text-[10px]">Salary Standard</span>
                      <p className="text-foreground font-medium mt-0.5">{watchAllFields.expectedSalary ? `${Number(watchAllFields.expectedSalary).toLocaleString()} BDT` : "N/A"}</p>
                    </div>
                  </div>
                  {watchAllFields.coverLetter && (
                    <div className="p-3">
                      <span className="font-bold block text-muted-foreground uppercase tracking-wider text-[10px]">Cover Letter Segment</span>
                      <p className="text-muted-foreground font-medium mt-1 line-clamp-3 leading-relaxed">{watchAllFields.coverLetter}</p>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-dashed border-border/80 p-3.5 bg-muted/5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="termsAccepted"
                      className="mt-0.5 rounded"
                      checked={watchAllFields.termsAccepted}
                      onCheckedChange={(checked) => setValue("termsAccepted", checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="termsAccepted" className="text-xs font-semibold text-foreground cursor-pointer flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        Diploma Student Status & Rules Check
                      </Label>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        I confirm that I am a current student/graduate of a Diploma-in-Engineering program and explicitly agree to the structural criteria and platform policies to proceed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="ghost" onClick={prevStep} className="h-10 px-4 rounded-xl text-xs font-semibold gap-1.5 text-muted-foreground" disabled={isApplying}>
                    <ChevronLeft className="h-4 w-4" />
                    Edit Settings
                  </Button>
                  <Button type="submit" disabled={isApplying} className="h-10 px-6 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-sm">
                    {isApplying ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Confirm & File Application
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4 animate-bounce">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground text-center">
              Application Filed Successfully!
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2 text-center">
              Your profile portfolio package has been structuralized and dispatched directly onto the recruiter board ecosystem.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsSuccessOpen(false);
                router.push("/jobs");
              }}
              className="h-10 rounded-xl text-xs font-semibold gap-1.5 border-border bg-transparent hover:bg-muted/40 text-foreground"
            >
              <Briefcase className="h-3.5 w-3.5" />
              Explore Jobs
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsSuccessOpen(false);
                router.push("/dashboard/my-applications");
              }}
              className="h-10 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 shadow-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              My Applications
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}