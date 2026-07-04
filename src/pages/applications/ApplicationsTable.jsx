import React from "react";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import DeleteApplication from "./DeleteApplication";
import EditApplication from "./EditApplication";

const statusStyles = {
  accepted: "text-emerald-600 border-emerald-500/25 bg-emerald-500/8",
  rejected: "text-rose-600 border-rose-500/25 bg-rose-500/8",
  reviewed: "text-blue-600 border-blue-500/25 bg-blue-500/8",
  shortlisted: "text-indigo-600 border-indigo-500/25 bg-indigo-500/8",
  interviewing: "text-purple-600 border-purple-500/25 bg-purple-500/8",
  pending: "text-amber-600 border-amber-500/25 bg-amber-500/8",
};

function StatusBadge({ status }) {
  const currentStatus = status?.toLowerCase() || "pending";
  return (
    <Badge
      className={`${statusStyles[currentStatus] || statusStyles.pending} rounded-full uppercase tracking-wide text-[10px] font-bold px-2.5 py-0.5 border`}
    >
      {currentStatus}
    </Badge>
  );
}

export default function ApplicationsTable({
  applications,
  role,
  canEditStatus,
  canDelete,
  pagination,
  createPageLink,
}) {
  const showApplicant = role === "recruiter" || role === "admin";
  const showCompany = role === "recruiter" || role === "admin";

  const columnCount = 3 + (showApplicant ? 1 : 0) + (showCompany ? 1 : 0);

  return (
    <div className="w-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm mt-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/40 border-b border-border/60">
            <tr>
              {showApplicant && (
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                  Applicant
                </th>
              )}
              <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                Position
              </th>
              {showCompany && (
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                  Company
                </th>
              )}
              <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                Experience
              </th>
              <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                Status
              </th>
              <th className="p-4 text-center text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={columnCount + 1} className="p-8 text-center text-muted-foreground">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-muted/10 transition-colors">
                  {showApplicant && (
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-tight">
                          {app.applicantInfo?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {app.applicantInfo?.email || "No email"}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">
                    <span className="font-semibold text-foreground text-sm">
                      {app.job?.title || "Untitled role"}
                    </span>
                  </td>
                  {showCompany && (
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {app.job?.company || "Unknown company"}
                      </span>
                    </td>
                  )}
                  <td className="p-4">
                    <span className="text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-md border border-border/40">
                      {app.experience} yrs
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={app.status} />
                      {canEditStatus && (
                        <EditApplication id={app._id} currentStatus={app.status} />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`?view=${app._id}`}
                        scroll={false}
                        className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {canDelete && <DeleteApplication id={app._id} />}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.pages > 1 && (
        <footer className="flex items-center justify-between border-t border-border/60 px-4 py-3.5 bg-muted/20">
          <span className="text-xs text-muted-foreground">
            Showing page <b>{pagination.page}</b> of <b>{pagination.pages}</b> ({pagination.total} total items)
          </span>
          <div className="flex items-center gap-1.5">
            {pagination.page <= 1 ? (
              <button
                disabled
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-border/40 text-muted-foreground/40 cursor-not-allowed bg-muted/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href={createPageLink(pagination.page - 1)}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-muted-foreground hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            )}
            {pagination.page >= pagination.pages ? (
              <button
                disabled
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-border/40 text-muted-foreground/40 cursor-not-allowed bg-muted/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href={createPageLink(pagination.page + 1)}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-muted-foreground hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}