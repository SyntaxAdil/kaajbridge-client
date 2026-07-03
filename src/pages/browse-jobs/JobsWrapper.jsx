"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, ListFilter, MapPin, Briefcase, Layers } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../../components/ui/pagination";
import Wrapper from "../../components/shared/Wrapper";
import JobCard from "../my-jobs/JobsCard";

const TYPE_OPTIONS = [
  { value: "all", label: "All Job Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const EXPERIENCE_OPTIONS = [
  { value: "all", label: "Any Experience" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead Level" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

function buildPageList(currentPage, totalPages) {
  const pages = [];
  const delta = 1;
  const range = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }
  pages.push(1);
  if (range[0] > 2) pages.push("ellipsis-start");
  pages.push(...range);
  if (range[range.length - 1] < totalPages - 1) pages.push("ellipsis-end");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export default function JobsWrapper({ initialJobs }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobs = Array.isArray(initialJobs?.data) ? initialJobs.data : [];
  const currentPage = initialJobs?.currentPage || 1;
  const totalPages = initialJobs?.totalPages || 1;
  const totalJobs = initialJobs?.totalJobs || 0;

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [locationInput, setLocationInput] = useState(searchParams.get("location") || "");
  const type = searchParams.get("type") || "all";
  const experience = searchParams.get("experience") || "all";
  const sort = searchParams.get("sort") || "newest";

  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (searchInput === currentSearch) return;
    const timeout = setTimeout(() => {
      updateParams({ search: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, updateParams, searchParams]);

  useEffect(() => {
    const currentLocation = searchParams.get("location") || "";
    if (locationInput === currentLocation) return;
    const timeout = setTimeout(() => {
      updateParams({ location: locationInput, page: 1 });
    }, 400);
    return () => clearTimeout(timeout);
  }, [locationInput, updateParams, searchParams]);

  const handleReset = () => {
    setSearchInput("");
    setLocationInput("");
    router.push("?");
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    updateParams({ page });
  };

  const pageList = buildPageList(currentPage, totalPages);

  return (
    <Wrapper>
      <div className="pb-6 mb-6 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Jobs</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5">
          {totalJobs} available job opportunities matching premium parameters.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 ">
        <div className="w-full lg:w-[280px] shrink-0 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-5  dark:bg-zinc-950 space-y-5 min-h-full bg-white ">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Refine</h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              × Reset
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Search by name
            </label>
            <InputGroup className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-700 transition-all duration-200 h-10">
              <InputGroupAddon className="pl-3 pr-1 text-zinc-400 flex items-center justify-center">
                <SearchIcon className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm h-full placeholder:text-zinc-400/70 w-full pr-3 py-0 text-zinc-800 dark:text-zinc-200"
              />
            </InputGroup>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                placeholder="Location..."
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="h-10 pl-9 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 focus-visible:ring-0 focus-visible:border-zinc-300 dark:focus-visible:border-zinc-700 placeholder:text-zinc-400/70 text-zinc-800 dark:text-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Job Type
            </label>
            <Select value={type} onValueChange={(v) => updateParams({ type: v, page: 1 })}>
              <SelectTrigger className="h-10 rounded-xl text-sm w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-zinc-400" />
                  <SelectValue placeholder="Job Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Experience
            </label>
            <Select value={experience} onValueChange={(v) => updateParams({ experience: v, page: 1 })}>
              <SelectTrigger className="h-10 rounded-xl text-sm w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-zinc-400" />
                  <SelectValue placeholder="Experience" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Sort By
            </label>
            <Select value={sort} onValueChange={(v) => updateParams({ sort: v, page: 1 })}>
              <SelectTrigger className="h-10 rounded-xl text-sm w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-zinc-400" />
                  <SelectValue placeholder="Sort" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} isRecruiter={false} />
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
              <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                No jobs match your filtering rules.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-8 justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? "pointer-events-none opacity-40" : ""}
                  />
                </PaginationItem>
                {pageList.map((item, idx) =>
                  item === "ellipsis-start" || item === "ellipsis-end" ? (
                    <PaginationItem key={`${item}-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        isActive={item === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(item);
                        }}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-40" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Wrapper>
  );
}