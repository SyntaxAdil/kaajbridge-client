"use client";

import React, { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Trash2, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import Link from "next/link";

const statusStyles = {
  open: "text-emerald-600 border-emerald-500/25 bg-emerald-500/8",
  closed: "text-zinc-500 border-zinc-500/25 bg-zinc-500/8",
};

// ✅ Main component wrapped with Suspense for useSearchParams
export default function AdminJobsWrapper(props) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <AdminJobsWrapperContent {...props} />
    </Suspense>
  );
}

function AdminJobsWrapperContent({
  initialJobs = [],
  initialTotal = 0,
  searchParams,
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams?.search || "");
  const [deletingId, setDeletingId] = useState(null);

  const status = searchParams?.status || "";
  const page = parseInt(searchParams?.page || "1");
  const limit = 10;
  const totalPages = Math.ceil(initialTotal / limit) || 1;

  const updateParams = (updates) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });
    startTransition(() => {
      router.push(`?${next.toString()}`);
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search, page: "1" });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/jobs/admin/${id}`, { method: "DELETE" });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete job");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={`w-full min-h-screen bg-background px-6 lg:px-8 py-8 transition-opacity duration-200 ${isPending ? "opacity-70" : "opacity-100"}`}>
      <div className="flex flex-col gap-6 pb-6">
        <div className="flex items-start gap-1">
          {/* <SidebarTrigger className="h-9 w-9 mt-0.5 text-muted-foreground hover:bg-muted" /> */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Global Job Administration
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and moderate {initialTotal} engineering job boards system-wide.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or company..."
                className="pl-10 h-11 rounded-xl bg-card border-border/75 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-11 px-6 rounded-xl font-medium bg-muted hover:bg-muted/80 border border-border/40 transition-colors">
              Search
            </Button>
          </form>

          <Select
            value={status || "all"}
            onValueChange={(value) => updateParams({ status: value === "all" ? "" : value, page: "1" })}
          >
            <SelectTrigger className="w-full sm:w-[160px] h-11 rounded-xl bg-card border-border/75 font-medium text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-xl side-bottom">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/20 border-b border-border/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Job Title
                </TableHead>
                <TableHead className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Company
                </TableHead>
                <TableHead className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Type
                </TableHead>
                <TableHead className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Location
                </TableHead>
                <TableHead className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Status
                </TableHead>
                <TableHead className="p-4 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border/40">
              {initialJobs.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="p-12 text-center text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
                    <span className="text-sm font-medium block">No job configurations found.</span>
                  </TableCell>
                </TableRow>
              ) : (
                initialJobs.map((job) => (
                  <TableRow key={job._id} className="hover:bg-muted/5 border-border/40 transition-colors">
                    <td className="p-4 font-bold text-foreground text-sm tracking-tight">
                      <Link href={`/dashboard/job/${job._id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">  
                      {job.title || "Untitled Role"}
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground/90">
                      {job.company || "Unknown Company"}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-md border border-border/40 capitalize">
                        {job.type || "N/A"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground/90">
                      {job.location || "Remote"}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${statusStyles[job.status] || statusStyles.closed} rounded-full uppercase tracking-wide text-[9px] font-bold px-2.5 py-0.5 border shadow-none`}
                      >
                        {job.status || "closed"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg text-muted-foreground/70 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                              disabled={deletingId === job._id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl border-border bg-card">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-base font-bold">Delete job listing permanently?</AlertDialogTitle>
                              <AlertDialogDescription className="text-xs text-muted-foreground">
                                This will remove &apos;{job.title}&apos; completely from the ecosystem. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(job._id)}
                                className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold"
                              >
                                Delete Global Post
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <footer className="flex items-center justify-between border-t border-border/60 px-4 py-3.5 bg-muted/10">
            <span className="text-xs text-muted-foreground/80">
              Showing page <b>{page}</b> of <b>{totalPages}</b> ({initialTotal} total items)
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg border border-border/60 text-muted-foreground hover:bg-muted transition-colors"
                disabled={page <= 1 || isPending}
                onClick={() => updateParams({ page: String(page - 1) })}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg border border-border/60 text-muted-foreground hover:bg-muted transition-colors"
                disabled={page >= totalPages || isPending}
                onClick={() => updateParams({ page: String(page + 1) })}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}