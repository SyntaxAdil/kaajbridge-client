"use client";

import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

const statusStyles = {
  pending:
    "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/15",
  new: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/15",
  reviewing:
    "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/15",
  shortlisted:
    "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/15",
  interviewing:
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15",
  offered:
    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/15",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15",
};

export default function RecentApplications({ applications = [], role }) {
  // console.log(applications)
  return (
    <div className="flex-1 bg-card rounded-2xl border border-border p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Recent Applications
        </h2>
        <Link
          href={"/dashboard/applications"}
          className="text-muted-foreground text-sm p-0 h-auto hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden border border-border/50">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="text-muted-foreground/70 font-medium">
                {role === "seeker" ? "Company / Job" : "Candidate Name"}
              </TableHead>
              <TableHead className="text-muted-foreground/70 font-medium">
                Target Role
              </TableHead>
              <TableHead className="text-muted-foreground/70 font-medium">
                Date Applied
              </TableHead>
              <TableHead className="text-muted-foreground/70 font-medium">
                Experience
              </TableHead>
              <TableHead className="text-muted-foreground/70 font-medium text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-sm text-muted-foreground"
                >
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => {
                const appId = app?._id || app?.id;
                const applicantName =
                  app?.applicant?.name ||
                  app?.applicant?.[0]?.name ||
                  "Anonymous Seeker";
                const applicantImage =
                  app?.applicant?.image || app?.applicant?.[0]?.image || "";

                const companyName = app?.job?.company || "Corporate Partner";
                const jobTitle = app?.job?.title || "Engineering Role";

                const appliedDate = app?.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                const displayTitle =
                  role === "seeker" ? companyName : applicantName;
                const avatarFallbackText =
                  displayTitle
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")
                    ?.slice(0, 2) || "KB";

                return (
                  <TableRow
                    key={appId}
                    className="border-b border-border/60 hover:bg-muted/20"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border bg-muted">
                          <AvatarImage
                            src={role === "seeker" ? "" : applicantImage}
                            alt={displayTitle}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs font-semibold bg-primary/5 text-muted-foreground">
                            {avatarFallbackText}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-foreground text-sm">
                          {displayTitle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {jobTitle}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {appliedDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm capitalize">
                      {app?.experience ? `${app.experience} Level` : "N/A"}
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Badge
                        className={`px-2.5 py-0.5 rounded-full font-medium text-xs border bg-transparent capitalize ${
                          statusStyles[app?.status?.toLowerCase()] ||
                          statusStyles.pending
                        }`}
                      >
                        {app?.status || "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
