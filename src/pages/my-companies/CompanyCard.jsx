"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import EditCompany from "./EditCompany";
import DeleteCompany from "./DeleteCompany";

const statusConfigMap = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    className:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-50 dark:bg-amber-500/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-50 dark:bg-rose-500/10",
  },
};

export default function CompanyCard({
  company,
  onUpdate,
  onDelete,
  isPrivete = true,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const verificationStatus = company?.verificationStatus || "pending";
  const isVerified = verificationStatus === "verified";

  const locationString = company?.address
    ? [company.address.street, company.address.city, company.address.country]
        .filter(Boolean)
        .join(", ")
    : "Location not specified";

  const statusConfig = statusConfigMap[verificationStatus] || statusConfigMap.pending;
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="group relative flex flex-col justify-between w-full h-full min-h-[340px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden py-0">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-grow">
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900 p-1 shadow-sm">
                  <AvatarImage
                    src={company?.companyLogo}
                    alt={company?.name}
                    className="object-contain rounded-lg"
                  />
                  <AvatarFallback className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Building2 className="h-5 w-5 stroke-[1.8]" />
                  </AvatarFallback>
                </Avatar>
                {isVerified && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-zinc-950 ring-2 ring-white dark:ring-zinc-950">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10" />
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                  {company?.name || "Unnamed Company"}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 capitalize mt-0.5 truncate">
                  {company?.industry?.replace("_", " & ") || "Other"}
                </p>
              </div>
            </div>
            <Badge
              className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm shrink-0 flex items-center gap-1 ${statusConfig.className}`}
            >
              <StatusIcon className="h-3 w-3" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-5 py-2 flex-grow">
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {company?.description || "No description provided."}
          </p>
        </CardContent>
      </div>

      <CardFooter className="p-4 sm:p-5 pt-3 flex-col items-stretch gap-3.5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 mt-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-4 w-4 shrink-0 text-indigo-500" />
            <span className="truncate font-medium text-zinc-700 dark:text-zinc-300" title={locationString}>
              {company?.address?.city || "Location not specified"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 font-bold text-zinc-900 dark:text-zinc-100">
            <Users className="h-4 w-4 text-indigo-500" />
            <span>{company?.size || "N/A"} Employees</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <div>
            {company?.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <Globe className="h-4 w-4 text-indigo-500" />
                <span className="hidden sm:inline">Website</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 italic select-none">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">No Website</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isPrivete ? (
              <>
                <Link href={`/dashboard/companies/${company?._id || company?.id}`}>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 shadow-sm transition-all duration-150"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditOpen(true)}
                  className="h-9 rounded-xl px-3.5 text-xs font-semibold flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 shadow-sm transition-all duration-150"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleteOpen(true)}
                  className="h-9 rounded-xl px-3.5 text-xs font-semibold flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-500/10 shadow-sm transition-all duration-150"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </>
            ) : (
              <Link href={`/dashboard/companies/${company?._id || company?.id}`}>
                <Button
                  type="button"
                  size="sm"
                  className="h-9 rounded-xl px-4 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                >
                  <Eye className="h-4 w-4" />
                  Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardFooter>

      {isPrivete && (
        <>
          <EditCompany
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            company={company}
            onUpdate={onUpdate}
          />
          <DeleteCompany
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            company={company}
            onDelete={onDelete}
          />
        </>
      )}
    </Card>
  );
}