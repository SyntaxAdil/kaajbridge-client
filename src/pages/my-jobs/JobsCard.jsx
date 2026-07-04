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
import { jobService } from "../../services/jobs";
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
    await jobService.updateJob(id, updatedData);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = async (id) => {
    await jobService.deleteJob(id);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Card className="group rounded-lg border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200 py-5 gap-4">
      <CardHeader className="px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-11 w-11 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0.5 shrink-0">
              <AvatarImage
                src={job?.companyLogo}
                alt={job?.company}
                className="object-contain rounded-md"
              />
              <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 rounded-md">
                <Building2 className="h-5 w-5 stroke-[1.6]" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                {job?.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                {job?.company}
              </p>
            </div>
          </div>
          <Badge
            className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${statusConfig.className}`}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-5 space-y-4">
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {job?.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {job?.type && (
            <Badge
              variant="outline"
              className="text-[10px] font-medium capitalize px-2 py-0.5 rounded-md border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-transparent"
            >
              <Briefcase className="h-3 w-3 mr-1" />
              {job.type.replace("-", " ")}
            </Badge>
          )}
          {job?.experience && (
            <Badge
              variant="outline"
              className="text-[10px] font-medium capitalize px-2 py-0.5 rounded-md border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-transparent"
            >
              <Layers className="h-3 w-3 mr-1" />
              {job.experience}
            </Badge>
          )}
          {skills.slice(0, 2).map((skill, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[10px] font-medium px-2 py-0.5 rounded-md border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge
              variant="outline"
              className="text-[10px] font-medium px-2 py-0.5 rounded-md border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 bg-transparent"
            >
              +{skills.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 flex-col items-stretch gap-3 border-t border-zinc-100 dark:border-zinc-900 pt-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-4">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
            <span className="truncate" title={job?.location}>
              {job?.location || "Remote"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 font-medium text-zinc-900 dark:text-zinc-100">
            <Wallet className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
            <span>{formatSalary(job?.salary)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Calendar className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
            <span>
              Deadline:{" "}
              {job?.applicationDeadline
                ? new Date(job.applicationDeadline).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          {isRecruiter ? (
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/job/${job?._id}`}>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-150"
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
            </div>
          ) : (
            <Link href={`/dashboard/job/${job?._id}`}>
              <Button
                type="button"
                size="sm"
                className="h-8 rounded-full px-4 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Apply Now
              </Button>
            </Link>
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