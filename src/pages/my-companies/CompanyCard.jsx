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
    <Card className="group rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200 py-5 gap-4 flex flex-col justify-between">
      <div>
        <CardHeader className="px-5 pt-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0.5">
                  <AvatarImage
                    src={company?.companyLogo}
                    alt={company?.name}
                    className="object-contain rounded-md"
                  />
                  <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 rounded-md">
                    <Building2 className="h-5 w-5 stroke-[1.6]" />
                  </AvatarFallback>
                </Avatar>
                {isVerified && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-zinc-950 ring-2 ring-white dark:ring-zinc-950">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10" />
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                  {company?.name || "Unnamed Company"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize mt-0.5 truncate">
                  {company?.industry?.replace("_", " & ") || "Other"}
                </p>
              </div>
            </div>
            <Badge
              className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 flex items-center gap-1 ${statusConfig.className}`}
            >
              <StatusIcon className="h-3 w-3" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-5 pt-4 pb-0">
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
            {company?.description || "No description provided."}
          </p>
        </CardContent>
      </div>

      <CardFooter className="px-5 flex-col items-stretch gap-3 border-t border-zinc-100 dark:border-zinc-900 pt-4 mt-4 pb-0">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-4">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
            <span className="truncate" title={locationString}>
              {company?.address?.city || "Location not specified"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Users className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
            <span>{company?.size || "N/A"} Employees</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <div>
            {company?.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Website</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 dark:text-zinc-700 italic select-none">
                <Globe className="h-3.5 w-3.5" />
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
                    size="sm"
                    className="h-8 w-8 p-0 rounded-md border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-150"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditOpen(true)}
                  className="h-8 rounded-md px-3 text-xs font-medium flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-150"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleteOpen(true)}
                  className="h-8 rounded-md px-3 text-xs font-medium flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-150"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </>
            ) : (
              <Link href={`/dashboard/companies/${company?._id || company?.id}`}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md px-3 text-xs font-medium flex items-center gap-1.5 border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-150"
                >
                  <Eye className="h-3.5 w-3.5" />
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