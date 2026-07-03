"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

export default function EditCompany({ isOpen, setIsOpen, company, onUpdate }) {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      name: company?.name || "",
      industry: company?.industry || "technology",
      description: company?.description || "",
      address: {
        street: company?.address?.street || "",
        city: company?.address?.city || "",
        country: company?.address?.country || "",
      },
      size: company?.size || "1-10",
      website: company?.website || "",
      companyLogo: company?.companyLogo || "",
    },
  });

  const companySize = watch("size");
  const companyIndustry = watch("industry");
  const logoUrl = watch("companyLogo");

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setValue("companyLogo", result.data.url, { shouldValidate: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const onEditSubmit = async (data) => {
    try {
      if (onUpdate) {
        await onUpdate(company?._id || company?.id, data);
        toast.success("Company updated successfully");
        router.push("/dashboard/my-companies");
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error( error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[580px] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-0">
        <div className="sticky top-0 z-10 bg-card border-b border-border/60 px-7 pt-6 pb-5 rounded-t-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-tight">
              Modify Company Profile
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
              Update your organizational metadata, location details, and
              structural size metrics.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onEditSubmit)} className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Company Name</FormLabel>
              <Input
                {...register("name")}
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.name} />
            </div>

            <div>
              <FormLabel required>Industry Category</FormLabel>
              <Select
                value={companyIndustry}
                onValueChange={(v) =>
                  setValue("industry", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology & IT</SelectItem>
                  <SelectItem value="finance">Fintech & Finance</SelectItem>
                  <SelectItem value="healthcare">
                    Healthcare & Pharma
                  </SelectItem>
                  <SelectItem value="education">Education & EdTech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                  <SelectItem value="media">Media & Entertainment</SelectItem>
                  <SelectItem value="manufacturing">
                    Manufacturing & Heavy Industry
                  </SelectItem>
                  <SelectItem value="construction">
                    Construction & Civil Engineering
                  </SelectItem>
                  <SelectItem value="telecommunication">
                    Telecommunication
                  </SelectItem>
                  <SelectItem value="power_energy">
                    Power & Energy Sector
                  </SelectItem>
                  <SelectItem value="automobile">
                    Automobile & Mechanical
                  </SelectItem>
                  <SelectItem value="garments_textile">
                    Garments & Textile
                  </SelectItem>
                  <SelectItem value="agro_food">
                    Agro & Food Processing
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={errors.industry} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <FormLabel required>Street</FormLabel>
              <Input
                {...register("address.street")}
                className="h-10 rounded-xl text-sm"
              />
            </div>
            <div>
              <FormLabel required>City</FormLabel>
              <Input
                {...register("address.city")}
                className="h-10 rounded-xl text-sm"
              />
            </div>
            <div>
              <FormLabel required>Country</FormLabel>
              <Input
                {...register("address.country")}
                className="h-10 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Company Size (Range)</FormLabel>
              <Select
                value={companySize}
                onValueChange={(v) =>
                  setValue("size", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501+">501+ employees</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={errors.size} />
            </div>

            <div>
              <FormLabel required>Website URL</FormLabel>
              <Input
                {...register("website")}
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.website} />
            </div>
          </div>

          <div>
            <FormLabel>Company Logo</FormLabel>
            <div className="flex items-center gap-4">
              {logoUrl && (
                <div className="relative h-[74px] w-[74px] rounded-xl border border-border overflow-hidden bg-muted/20 flex-shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt="Company Logo Preview"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
              )}

              <label
                className={`relative flex flex-col items-center justify-center flex-1 h-[74px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 group ${logoUrl ? "border-emerald-500/30 bg-emerald-500/5" : "border-border hover:border-primary/40 hover:bg-muted/30 bg-muted/10"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <div className="flex flex-col items-center gap-1 pointer-events-none select-none px-4 text-center">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Uploading image...
                      </span>
                    </>
                  ) : logoUrl ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Click to change logo
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-5 w-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Click to upload logo
                      </span>
                    </>
                  )}
                </div>
              </label>
            </div>
            <FieldError error={errors.companyLogo} />
          </div>

          <div>
            <FormLabel required>Company Description</FormLabel>
            <Textarea
              {...register("description")}
              rows={3}
              className="resize-none rounded-xl p-3 text-sm leading-relaxed"
            />
            <FieldError error={errors.description} />
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
