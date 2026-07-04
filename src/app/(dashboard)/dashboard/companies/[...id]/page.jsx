import React from "react";
import Link from "next/link";
import Image from "next/image";
import { companyService } from "../../../../../services/company";
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  Users, 
  CalendarDays, 
  MapPin, 
  ShieldCheck, 
  User,
  ExternalLink,
  Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CompanyDetailsPage({ params }) {
  const { id } = await params;
  const company = await companyService.getCompanyById(id).then((res) => res.data);

  const recruiter = company?.ownedBy?.[0] || company?.owner;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <Link 
          href="/dashboard/companies" 
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Companies
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full min-w-0">
            <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm shrink-0 p-2">
              {company?.companyLogo ? (
                <Image
                  src={company.companyLogo}
                  alt={company.name}
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <Building2 className="h-10 w-10 text-zinc-400 dark:text-zinc-600" />
              )}
            </div>

            <div className="space-y-2 min-w-0 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 capitalize text-[11px] font-medium rounded-md px-2.5 py-0.5 border-none">
                  {company?.industry?.replace("_", " & ") || "Other"}
                </Badge>
                {company?.isVerified && (
                  <Badge className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 gap-1 text-[11px] font-semibold rounded-md px-2.5 py-0.5 border border-indigo-100 dark:border-indigo-500/20 shadow-none">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 truncate">
                {company?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 capitalize font-medium">
                  <MapPin className="h-4 w-4 text-zinc-400 dark:text-zinc-600" /> 
                  {company?.address?.city || "Dhaka"}{company?.address?.country ? `, ${company.address.country}` : ", Bangladesh"}
                </span>
                {company?.website && (
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-semibold"
                  >
                    <Globe className="h-4 w-4" /> Visit Website <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-zinc-400" /> Corporate Profile
            </h2>
            <Separator className="bg-zinc-100 dark:bg-zinc-900" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
              {company?.description || "No overview details documented for this workplace profile."}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Contact & Communication
            </h2>
            <Separator className="bg-zinc-100 dark:bg-zinc-900" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Email Address</span>
                  <a href={`mailto:${company?.email}`} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block">
                    {company?.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Phone Directory</span>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block truncate">
                    {company?.phone || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Corporate Registry
            </h2>
            <Separator className="bg-zinc-100 dark:bg-zinc-900" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Company Size</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {company?.size || "N/A"} employees
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Year Founded</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {company?.founded || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Workspace Authority
            </h3>
            <Separator className="bg-zinc-100 dark:bg-zinc-900" />
            
            <div className="flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-900/50">
              <Avatar className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <AvatarImage src={recruiter?.image} alt={recruiter?.name || "Workspace Recruiter"} />
                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded-lg text-xs font-semibold">
                  {recruiter?.name ? recruiter.name.substring(0, 2).toUpperCase() : "RC"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
                  {recruiter?.name || "Workspace Recruiter"}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  Recruiter Profile
                </p>
              </div>
            </div>
            
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
              Authorized Recruiter profile responsible for maintaining validation status over this workspace deployment ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}