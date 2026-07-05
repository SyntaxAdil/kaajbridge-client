"use client";

import React, { useTransition } from "react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function FilterApplication({
  currentSearch,
  currentStatus,
  pageSubtitle,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <header
      className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60 transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ms-4 me-2" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Job Applications
          </h1>
          
          <p className="text-sm text-muted-foreground mt-1">{pageSubtitle}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
        <Select
          defaultValue={currentStatus || "all"}
          onValueChange={(val) =>
            updateQueryParams({ status: val === "all" ? "" : val, page: "1" })
          }
        >
          <SelectTrigger className="w-full sm:w-44 rounded-xl border-border/60 bg-muted/30 text-sm">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border bg-card">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-full sm:w-72">
          <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
            <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search & hit Enter..."
              defaultValue={currentSearch}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                updateQueryParams({ search: e.currentTarget.value, page: "1" })
              }
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
            />
          </InputGroup>
        </div>
      </div>
    </header>
  );
}
