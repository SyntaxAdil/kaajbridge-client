import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  Users,
  CalendarDays,
  MapPin,
  ExternalLink,
  Command,
  Radio,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { companyService } from "../../../../../services/company";


export default async function CompanyDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const company = await companyService
    .getCompanyById(id)
    .then((res) => res.data)
    .catch(() => null);

  const recruiter = company?.ownedBy?.[0] || company?.owner;
  const isVerified = company?.verificationStatus === "verified";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">
      <div>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 stroke-[2.5]" />
          Go to Company
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-start gap-6 min-w-0">
          <div className="relative h-20 w-20 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-800/50 p-2">
            {company?.companyLogo ? (
              <Image
                src={company.companyLogo}
                alt={company?.name || "Company Logo"}
                fill
                className="object-contain p-2"
              />
            ) : (
              <Building2 className="h-9 w-9 text-zinc-400 dark:text-zinc-600 stroke-[1.5]" />
            )}
          </div>

          <div className="space-y-2.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {company?.industry || "Technology"}
              </span>
              <span className="text-zinc-300 dark:text-zinc-800">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-zinc-400 stroke-[1.8]" />
                {company?.address?.city || "Dhaka"}
              </span>
              {isVerified && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-800">•</span>
                  <Badge
                    variant="outline"
                    className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-none text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
                  >
                    Verified
                  </Badge>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans leading-none">
              {company?.name || "Company Profile"}
            </h1>
          </div>
        </div>

        {company?.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm"
          >
            <Globe className="h-3.5 w-3.5" /> Visit Portal
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 stroke-[2]" /> About Company
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
              {company?.description ||
                "No overview details documented for this workplace profile."}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 stroke-[2] text-zinc-400" />{" "}
              Channels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${company?.email || ""}`}
                className="flex flex-col p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors min-w-0"
              >
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5 mb-1">
                  <Mail className="h-3 w-3" /> Email Gateway
                </span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {company?.email || "Not specified"}
                </span>
              </a>

              <div className="flex flex-col p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 min-w-0">
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5 mb-1">
                  <Phone className="h-3 w-3" /> Phone Network
                </span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {company?.phone || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                <Command className="h-3.5 w-3.5 stroke-[2]" /> Enterprise Intel
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Scale
                  </span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mt-0.5">
                    <Users className="h-3.5 w-3.5 text-zinc-400 stroke-[1.8]" />{" "}
                    {company?.size || "N/A"} Team
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Timeline
                  </span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mt-0.5">
                    <CalendarDays className="h-3.5 w-3.5 text-zinc-400 stroke-[1.8]" />{" "}
                    Est. {company?.founded || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-200/60 dark:bg-zinc-800/60" />

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0.5 shadow-sm">
                  <AvatarImage
                    src={recruiter?.image}
                    alt={recruiter?.name || "Workspace Recruiter"}
                    className="rounded-lg object-cover"
                  />
                  <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 rounded-lg text-xs font-black tracking-wider">
                    {recruiter?.name
                      ? recruiter.name.substring(0, 2).toUpperCase()
                      : "RC"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate leading-none mb-1">
                    {recruiter?.name || "Workspace Recruiter"}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                    Authorized Recruiter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
