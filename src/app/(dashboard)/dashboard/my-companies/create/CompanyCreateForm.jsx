"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { companyRegisterSchema } from "../../../../../schema/company-schema";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../../../../../components/ui/alert";
import {
  AlertTriangle,
  UploadCloud,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../../../../components/ui/select";
import { companyService } from "@/services/company";

const INDUSTRY_OPTIONS = [
  { value: "technology", label: "Technology & IT" },
  { value: "finance", label: "Fintech & Finance" },
  { value: "healthcare", label: "Healthcare & Pharma" },
  { value: "education", label: "Education & EdTech" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "media", label: "Media & Entertainment" },
  { value: "manufacturing", label: "Manufacturing & Heavy Industry" },
  { value: "construction", label: "Construction & Civil Engineering" },
  { value: "telecommunication", label: "Telecommunication" },
  { value: "power_energy", label: "Power & Energy Sector" },
  { value: "automobile", label: "Automobile & Mechanical" },
  { value: "garments_textile", label: "Garments & Textile" },
  { value: "agro_food", label: "Agro & Food Processing" },
  { value: "other", label: "Other" },
];

const SIZE_OPTIONS = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];

function FormLabel({ children, required }) {
  return (
    <label className="block text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground/80 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-[11px] text-red-500 mt-0.5">{error.message}</p>;
}

export default function CompanyCreateForm() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      companyLogo: "",
      website: "",
      description: "",
      social: { linkedin: "", facebook: "", twitter: "" },
    },
  });

  const logoUrl = watch("companyLogo");

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const uploaderData = new FormData();
    uploaderData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: uploaderData,
      });
      const json = await res.json();
      if (json.success) {
        setValue("companyLogo", json.data.url, { shouldValidate: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const onCompanySubmit = async (data) => {
    try {
      await companyService.createCompany(data);
      router.push("/dashboard/my-companies");
      router.refresh();
    } catch (err) {
      console.error("API Error creating company:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden">
      <div className="border-b border-border/60 p-5 flex items-center justify-between bg-muted/5">
        <div className="flex items-center gap-3.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/my-companies")}
            className="rounded-xl border border-border h-9 w-9 bg-background"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Register Company Profile</h1>
            <p className="text-xs text-muted-foreground">
              Set up your company workspace to publish verified job boards.
            </p>
          </div>
        </div>

        <Alert className="hidden md:flex bg-amber-500/5 border border-amber-500/15 py-1.5 px-3 rounded-xl w-auto max-w-xs items-center gap-2 shadow-none">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <AlertDescription className="text-[11px] text-amber-700 font-medium leading-none p-0 m-0">
            Designated for Diploma Engineering networks.
          </AlertDescription>
        </Alert>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onCompanySubmit)} className="space-y-5">
          <div className="bg-muted/10 border border-border/40 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <FormLabel required>Company Name</FormLabel>
              <Input
                {...register("name")}
                placeholder="Stripe"
                className="h-9 rounded-lg text-sm bg-background"
              />
              <FieldError error={errors.name} />
            </div>
            <div>
              <FormLabel required>Official Email</FormLabel>
              <Input
                type="email"
                {...register("email")}
                placeholder="hr@stripe.com"
                className="h-9 rounded-lg text-sm bg-background"
              />
              <FieldError error={errors.email} />
            </div>
            <div>
              <FormLabel required>Phone Number</FormLabel>
              <Input
                {...register("phone")}
                placeholder="+88017..."
                className="h-9 rounded-lg text-sm bg-background"
              />
              <FieldError error={errors.phone} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-muted/10 border border-border/40 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormLabel required>Industry Type</FormLabel>
                  <Select
                    onValueChange={(v) =>
                      setValue("industry", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="h-9 rounded-lg text-sm bg-background">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError error={errors.industry} />
                </div>
                <div>
                  <FormLabel required>Company Size</FormLabel>
                  <Select
                    onValueChange={(v) =>
                      setValue("size", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="h-9 rounded-lg text-sm bg-background">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {SIZE_OPTIONS.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError error={errors.size} />
                </div>
                <div>
                  <FormLabel>Website Link</FormLabel>
                  <Input
                    {...register("website")}
                    placeholder="https://stripe.com"
                    className="h-9 rounded-lg text-sm bg-background"
                  />
                  <FieldError error={errors.website} />
                </div>
                <div>
                  <FormLabel>Founded Year</FormLabel>
                  <Input
                    type="number"
                    {...register("founded")}
                    placeholder="e.g. 2015"
                    className="h-9 rounded-lg text-sm bg-background"
                  />
                  <FieldError error={errors.founded} />
                </div>
              </div>

              <div className="bg-muted/10 border border-border/40 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3 -mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">HQ Address</span>
                </div>
                <div className="sm:col-span-1">
                  <FormLabel required>Street</FormLabel>
                  <Input
                    {...register("address.street")}
                    placeholder="123 Main St"
                    className="h-9 rounded-lg text-sm bg-background"
                  />
                  <FieldError error={errors.address?.street} />
                </div>
                <div>
                  <FormLabel required>City</FormLabel>
                  <Input
                    {...register("address.city")}
                    placeholder="Dhaka"
                    className="h-9 rounded-lg text-sm bg-background"
                  />
                  <FieldError error={errors.address?.city} />
                </div>
                <div>
                  <FormLabel required>Country</FormLabel>
                  <Input
                    {...register("address.country")}
                    placeholder="Bangladesh"
                    className="h-9 rounded-lg text-sm bg-background"
                  />
                  <FieldError error={errors.address?.country} />
                </div>
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col justify-between bg-muted/10 border border-border/40 rounded-xl p-4">
              <div className="w-full h-full flex flex-col">
                <FormLabel>Company Logo</FormLabel>
                <div className="w-full flex-1 min-h-[140px] relative flex flex-col">
                  {logoUrl ? (
                    <div className="relative w-full flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center p-4">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-lg z-20"
                        onClick={() => setValue("companyLogo", "", { shouldValidate: true })}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-border/60 bg-background mb-2 flex items-center justify-center shadow-sm">
                        <Image
                          src={logoUrl}
                          alt="Company Logo"
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center gap-0.5">
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">Logo processed perfectly</span>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`relative flex flex-col items-center justify-center w-full flex-1 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 group bg-background
                        ${isUploading ? "border-muted" : "border-border hover:border-primary/30 hover:bg-muted/20"}`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center text-center p-3 gap-1 pointer-events-none select-none">
                        {isUploading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">Uploading logo...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-5 w-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                            <span className="text-xs font-medium text-muted-foreground">Upload Logo</span>
                            <span className="text-[10px] text-muted-foreground/40">Max 5MB</span>
                          </>
                        )}
                      </div>
                    </label>
                  )}
                </div>
                <FieldError error={errors.companyLogo} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-muted/10 border border-border/40 rounded-xl p-4">
              <FormLabel>Company Description</FormLabel>
              <Textarea
                {...register("description")}
                className="resize-none rounded-lg p-2.5 text-sm leading-relaxed bg-background h-[88px]"
                placeholder="Describe your company's mission, culture and work environment..."
              />
            </div>

            <div className="md:col-span-1 bg-muted/10 border border-border/40 rounded-xl p-4 flex flex-col justify-between gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Socials (Optional)</span>
              <div className="space-y-2 flex-1 flex flex-col justify-center">
                <Input
                  {...register("social.linkedin")}
                  placeholder="LinkedIn URL"
                  className="h-8 rounded-lg text-xs bg-background"
                />
                <Input
                  {...register("social.facebook")}
                  placeholder="Facebook URL"
                  className="h-8 rounded-lg text-xs bg-background"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-4 flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl h-10 px-5 text-sm"
              onClick={() => router.push("/dashboard/my-companies")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Initialize Company Space"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}