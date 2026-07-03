"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { companyRegisterSchema } from "../../schema/company-schema";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  Plus,
  AlertTriangle,
  SearchIcon,
  UploadCloud,
  Loader2,
  CheckCircle2,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../components/ui/select";
import { SidebarTrigger } from "../../components/ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../../components/ui/pagination";
import CompanyCard from "./CompanyCard";
import { companyService } from "@/services/company";

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

function buildPageList(currentPage, totalPages) {
  const pages = [];
  const delta = 1;
  const range = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }
  pages.push(1);
  if (range[0] > 2) pages.push("ellipsis-start");
  pages.push(...range);
  if (range[range.length - 1] < totalPages - 1) pages.push("ellipsis-end");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export default function MyCompanyWrapper({ initialCompanies }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    setCompanies(
      Array.isArray(initialCompanies?.data)
        ? initialCompanies.data
        : Array.isArray(initialCompanies)
          ? initialCompanies
          : [],
    );
    if (initialCompanies?.pagination) {
      setPagination(initialCompanies.pagination);
    }
  }, [initialCompanies]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const goToPage = (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.page)
      return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const onCompanySubmit = async (data) => {
    try {
      const response = await companyService.createCompany(data);
      const newCompany = response?.data ?? response;
      setCompanies((prev) => [newCompany, ...prev]);
      setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
      router.refresh();
      reset();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("API Error creating company:", err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await companyService.updateCompany(id, updatedData);
      const updatedCompany = response?.data ?? response;
      setCompanies((prev) =>
        prev.map((c) =>
          (c._id || c.id) === id ? { ...c, ...updatedCompany } : c,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await companyService.deleteCompany(id);
      setCompanies((prev) => prev.filter((c) => (c._id || c.id) !== id));
      setPagination((prev) => ({
        ...prev,
        total: Math.max(prev.total - 1, 0),
      }));
      router.refresh();
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const pageList = buildPageList(pagination.page, pagination.totalPages);

  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-0 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className={"px-6"}></SidebarTrigger>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              My Companies
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your registered companies and their verification states.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-72 lg:w-80 shrink-0">
          <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
            <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
            />
          </InputGroup>
        </div>
      </header>
      <div className="flex items-center justify-between mb-7">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">
            {pagination.total}
          </span>{" "}
          companies registered
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all duration-200">
              <Plus className="h-4 w-4 stroke-[2.5]" />
              Register Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[580px] max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card p-0">
            <div className="sticky top-0 z-10 bg-card border-b border-border/60 px-7 pt-6 pb-5 rounded-t-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold tracking-tight">
                  Register Company Profile
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                  Set up your company workspace to publish verified job boards.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="px-7 pt-5 pb-7">
              <Alert className="bg-amber-500/8 border border-amber-500/25 py-3 px-4 mb-6 rounded-xl">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="font-semibold text-xs text-amber-600 ml-1">
                  Verification Required
                </AlertTitle>
                <AlertDescription className="text-[11.5px] text-amber-600/80 mt-0.5 ml-1">
                  Company roles must be designated for Diploma Engineering
                  networks.
                </AlertDescription>
              </Alert>
              <form
                onSubmit={handleSubmit(onCompanySubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel required>Company Name</FormLabel>
                    <Input
                      {...register("name")}
                      placeholder="Stripe"
                      className="h-10 rounded-xl text-sm"
                    />
                    <FieldError error={errors.name} />
                  </div>
                  <div>
                    <FormLabel required>Official Email</FormLabel>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="hr@stripe.com"
                      className="h-10 rounded-xl text-sm"
                    />
                    <FieldError error={errors.email} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FormLabel required>Phone</FormLabel>
                    <Input
                      {...register("phone")}
                      placeholder="+88017..."
                      className="h-10 rounded-xl text-sm"
                    />
                    <FieldError error={errors.phone} />
                  </div>
                  <div>
                    <FormLabel required>Industry</FormLabel>
                    <Select
                      onValueChange={(v) =>
                        setValue("industry", v, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">
                          Technology & IT
                        </SelectItem>
                        <SelectItem value="finance">
                          Fintech & Finance
                        </SelectItem>
                        <SelectItem value="healthcare">
                          Healthcare & Pharma
                        </SelectItem>
                        <SelectItem value="education">
                          Education & EdTech
                        </SelectItem>
                        <SelectItem value="ecommerce">
                          E-commerce & Retail
                        </SelectItem>
                        <SelectItem value="media">
                          Media & Entertainment
                        </SelectItem>
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
                  <div>
                    <FormLabel required>Company Size</FormLabel>
                    <Select
                      onValueChange={(v) =>
                        setValue("size", v, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger className="h-10 rounded-xl text-sm w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10 employees</SelectItem>
                        <SelectItem value="11-50">11–50 employees</SelectItem>
                        <SelectItem value="51-200">51–200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201–500 employees
                        </SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError error={errors.size} />
                  </div>
                </div>
                <div className="space-y-3">
                  <SectionDivider label="HQ Address" />
                  <div>
                    <FormLabel required>Street</FormLabel>
                    <Input
                      {...register("address.street")}
                      placeholder="123 Main Street"
                      className="h-10 rounded-xl text-sm"
                    />
                    <FieldError error={errors.address?.street} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel required>City</FormLabel>
                      <Input
                        {...register("address.city")}
                        placeholder="Dhaka"
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.address?.city} />
                    </div>
                    <div>
                      <FormLabel required>Country</FormLabel>
                      <Input
                        {...register("address.country")}
                        placeholder="Bangladesh"
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.address?.country} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <SectionDivider label="Company Details" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel>Website</FormLabel>
                      <Input
                        {...register("website")}
                        placeholder="https://stripe.com"
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.website} />
                    </div>
                    <div>
                      <FormLabel>Founded Year</FormLabel>
                      <Input
                        type="number"
                        {...register("founded")}
                        placeholder="e.g. 2015"
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.founded} />
                    </div>
                  </div>
                  <div>
                    <FormLabel>Company Logo</FormLabel>
                    <label
                      className={`relative flex flex-col items-center justify-center w-full h-[100px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 group
                        ${
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
                    <FieldError error={errors.companyLogo} />
                  </div>
                  <div>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...register("description")}
                      rows={3}
                      className="resize-none rounded-xl p-3 text-sm leading-relaxed"
                      placeholder="Describe your company's mission, culture and work environment..."
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <SectionDivider label="Social Channels (Optional)" />
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <FormLabel>LinkedIn</FormLabel>
                      <Input
                        {...register("social.linkedin")}
                        placeholder="https://..."
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.social?.linkedin} />
                    </div>
                    <div>
                      <FormLabel>Facebook</FormLabel>
                      <Input
                        {...register("social.facebook")}
                        placeholder="https://..."
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.social?.facebook} />
                    </div>
                    <div>
                      <FormLabel>X (Twitter)</FormLabel>
                      <Input
                        {...register("social.twitter")}
                        placeholder="https://x.com/..."
                        className="h-10 rounded-xl text-sm"
                      />
                      <FieldError error={errors.social?.twitter} />
                    </div>
                  </div>
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
                        Processing...
                      </>
                    ) : (
                      "Initialize Company Space"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company._id || company.id}
            company={company}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(pagination.page - 1);
                }}
                className={
                  !pagination.hasPrevPage
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              />
            </PaginationItem>
            {pageList.map((item, idx) =>
              item === "ellipsis-start" || item === "ellipsis-end" ? (
                <PaginationItem key={`${item}-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={item === pagination.page}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(pagination.page + 1);
                }}
                className={
                  !pagination.hasNextPage
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
