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

export default function EditCompany({
  isOpen,
  setIsOpen,
  company,
  onUpdate,
}) {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      name: company?.name || "",
      category: company?.category || "",
      description: company?.description || "",
      location: company?.location || "",
      range: company?.range || "1-10 employees",
      website: company?.website || "",
      logo: company?.logo || "",
      status: company?.status || "Pending",
    },
  });

  const logoUrl = watch("logo");

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (result.success) {
        setValue("logo", result.data.url, {
          shouldValidate: true,
        });
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
              Modify Company Profile
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
              Update the organizational metadata, size metrics, and
              verification status.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(onEditSubmit)}
          className="p-7 space-y-5"
        >
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
              <Input
                {...register("category")}
                placeholder="e.g. Technology, Construction"
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.category} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Location Headquarter</FormLabel>
              <Input
                {...register("location")}
                className="h-10 rounded-xl text-sm"
              />
              <FieldError error={errors.location} />
            </div>

            <div>
              <FormLabel required>Company Size (Range)</FormLabel>

              <Select
                value={watch("range")}
                onValueChange={(v) =>
                  setValue("range", v, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1-10 employees">
                    1-10 employees
                  </SelectItem>
                  <SelectItem value="11-50 employees">
                    11-50 employees
                  </SelectItem>
                  <SelectItem value="51-200 employees">
                    51-200 employees
                  </SelectItem>
                  <SelectItem value="201-500 employees">
                    201-500 employees
                  </SelectItem>
                  <SelectItem value="501+ employees">
                    501+ employees
                  </SelectItem>
                </SelectContent>
              </Select>

              <FieldError error={errors.range} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel required>Website URL</FormLabel>

              <Input
                {...register("website")}
                placeholder="https://example.com"
                className="h-10 rounded-xl text-sm"
              />

              <FieldError error={errors.website} />
            </div>

            <div>
              <FormLabel>Company Logo</FormLabel>

              <label
                className={`relative flex flex-col items-center justify-center w-full h-[100px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 group ${
                  logoUrl
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/30 bg-muted/10"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />

                <div className="flex flex-col items-center gap-1.5 pointer-events-none select-none">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Uploading image...
                      </span>
                    </>
                  ) : logoUrl ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-600">
                        Logo uploaded successfully
                      </span>
                      <span className="text-[11px] text-muted-foreground/60">
                        Click to replace
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-6 w-6 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Click to upload company logo
                      </span>
                      <span className="text-[11px] text-muted-foreground/50">
                        PNG, JPG or SVG · max 5MB
                      </span>
                    </>
                  )}
                </div>
              </label>

              <FieldError error={errors.logo} />
            </div>
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

          <div>
            <FormLabel required>Verification Status</FormLabel>

            <Select
              value={watch("status")}
              onValueChange={(v) =>
                setValue("status", v, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
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