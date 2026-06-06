"use client";

import React from "react";
import { Button } from "../../components/ui/button";
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

const applicationsData = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    variant: "success",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    variant: "secondary",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    variant: "warning",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
    variant: "destructive",
  },
];

const statusStyles = {
  success:
    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/15",
  secondary:
    "bg-background text-foreground border-zinc-700 hover:bg-zinc-500/15",
  warning:
    "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/15",
  destructive:
    "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15",
};

export default function RecentApplications() {
  return (
    <div className="flex-1 bg-card rounded-2xl border border-border p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Recent Applications
        </h2>
        <Link href={"/dashboard/applications"} className="text-muted-foreground text-sm p-0 h-auto hover:text-foreground">
          
            View all
          
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden border border-border/50">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="text-muted-foreground/70 font-medium">
                Candidate Name
              </TableHead>
              <TableHead className="text-muted-foreground/70 font-medium">
                Role
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
            {applicationsData.map((app) => (
              <TableRow
                key={app.name}
                className="border-b border-border/60 hover:bg-muted/20"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border bg-muted">
                      <AvatarImage src="" alt={app.name} />
                      <AvatarFallback className="text-xs font-semibold bg-primary/5 text-muted-foreground">
                        {app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground text-sm">
                      {app.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {app.role}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {app.date}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {app.experience}
                </TableCell>
                <TableCell className="text-right py-4">
                  <Badge
                    className={`px-2.5 py-0.5 rounded-full font-medium text-xs border bg-transparent ${statusStyles[app.variant]}`}
                  >
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
