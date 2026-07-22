"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Layers,
  Wallet,
  Calendar,
  Pencil,
  Trash2,
  Briefcase,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import EditJob from "./EditJob";
import DeleteJobs from "./DeleteJobs";
import Link from "next/link";

const STATUS_CONFIG = {
  open: {
    label: "Open",
    className:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
  },
  active: {
    label: "Active",
    className:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
  },
  approved: {
    label: "Approved",
    className:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
  },
  closed: {
    label: "Closed",
    className:
      "text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800",
  },
  pending: {
    label: "Pending",
    className:
      "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-50 dark:bg-amber-500/10",
  },
};

function formatSalary(salary) {
  if (!salary) return "Negotiable";
  if (typeof salary === "object") {
    const symbol =
      salary?.currency === "USD" ? "$" : salary?.currency === "EUR" ? "€" : "৳";
    const min = Number(salary?.min || 0).toLocaleString();
    const max = Number(salary?.max || 0).toLocaleString();
    return `${symbol}${min} - ${symbol}${max}`;
  }
  return salary;
}

export default function JobCard({ job, isRecruiter = false }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const statusKey = job?.status?.toLowerCase() || "pending";
  const statusConfig = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;
  const skills = Array.isArray(job?.skills) ? job.skills : [];

  const handleUpdate = async (id, updatedData) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.message || "Failed to update job");
    }
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.message || "Failed to delete job");
    }
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Card className="group relative flex flex-col justify-between w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="p-4 sm:p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900 p-1 shrink-0 shadow-sm">
              <AvatarImage
                src={job?.companyLogo}
                alt={job?.company}
                className="object-contain rounded-lg"
              />
              <AvatarFallback className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <Building2 className="h-5 w-5 stroke-[1.8]" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                {job?.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                {job?.company}
              </p>
            </div>
          </div>
          <Badge
            className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm shrink-0 ${statusConfig.className}`}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-5 py-2 space-y-4">
        <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {job?.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {job?.type && (
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs font-medium capitalize px-2.5 py-1 rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 shadow-xs"
            >
              <Briefcase className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
              {job.type.replace("-", " ")}
            </Badge>
          )}
          {job?.experience && (
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs font-medium capitalize px-2.5 py-1 rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 shadow-xs"
            >
              <Layers className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
              {job.experience}
            </Badge>
          )}
          {skills.slice(0, 2).map((skill, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg border-indigo-200/80 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-xs"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs font-medium px-2 py-1 rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 bg-transparent shadow-xs"
            >
              +{skills.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-5 pt-3 flex-col items-stretch gap-3.5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-4 w-4 shrink-0 text-indigo-500" />
            <span className="truncate font-medium text-zinc-700 dark:text-zinc-300" title={job?.location}>
              {job?.location || "Remote"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 font-bold text-zinc-900 dark:text-zinc-100">
            <Wallet className="h-4 w-4 text-indigo-500" />
            <span>{formatSalary(job?.salary)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <Calendar className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <span>
              Deadline:{" "}
              <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">
                {job?.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : "N/A"}
              </strong>
            </span>
          </div>

          {isRecruiter ? (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link href={`/dashboard/job/${job?._id}`}>
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
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href={`/dashboard/job/${job?._id}`} className="w-full sm:w-auto">
                <Button
                  type="button"
                  size="sm"
                  className="w-full sm:w-auto h-10 sm:h-9 rounded-xl px-5 text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardFooter>

      {isRecruiter && (
        <>
          <EditJob
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            job={job}
            onUpdate={handleUpdate}
          />
          <DeleteJobs
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            job={job}
            onDelete={handleDelete}
          />
        </>
      )}
    </Card>
  );
}