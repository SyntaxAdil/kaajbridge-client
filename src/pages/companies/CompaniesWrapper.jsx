"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, ListFilter } from "lucide-react";
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
import CompanyCard from "../my-companies/CompanyCard";


const INDUSTRY_OPTIONS = [
  { value: "all", label: "All Industries" },
  { value: "technology", label: "Technology & IT" },
  { value: "finance", label: "Fintech & Finance" },
  { value: "healthcare", label: "Healthcare & Pharma" },
  { value: "education", label: "Education & EdTech" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "media", label: "Media & Entertainment" },
  { value: "manufacturing", label: "Manufacturing & Heavy Industry" },
  { value: "construction", label: "Construction & Civil Engineering" },
  { value: "telecommunication", label: "Telecommunication" },
  { value: "power_energy", label: "Power & Energy Sector" },
  { value: "automobile", label: "Automobile & Mechanical" },
  { value: "garments_textile", label: "Garments & Textile" },
  { value: "agro_food", label: "Agro & Food Processing" },
  { value: "other", label: "Other" },
];

const SIZE_OPTIONS = [
  { value: "all", label: "Any Size" },
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name_asc", label: "Name A–Z" },
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

export default function CompaniesWrapper({ initialCompanies }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const companies = Array.isArray(initialCompanies?.data) ? initialCompanies.data : [];
  const currentPage = initialCompanies?.currentPage || 1;
  const totalPages = initialCompanies?.totalPages || 1;
  const totalCompany = initialCompanies?.totalCompany || 0;

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [locationInput, setLocationInput] = useState(searchParams.get("location") || "");
  const industry = searchParams.get("industry") || "all";
  const size = searchParams.get("size") || "all";
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
  }, [searchInput]);

  useEffect(() => {
    const currentLocation = searchParams.get("location") || "";
    if (locationInput === currentLocation) return;
    const timeout = setTimeout(() => {
      updateParams({ location: locationInput, page: 1 });
    }, 400);
    return () => clearTimeout(timeout);
  }, [locationInput]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    updateParams({ page });
  };

  const pageList = buildPageList(currentPage, totalPages);

  return (
    <Wrapper>
      <div className="pb-6 mb-6 border-b border-border/60">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Companies</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {totalCompany} verified companies hiring diploma engineers.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-7">
        <div className="flex-1">
          <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
            <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search companies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
            />
          </InputGroup>
        </div>

        <Input
          placeholder="Country"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="h-10 rounded-xl text-sm bg-muted/30 border-border/60 w-full lg:w-40"
        />

        <Select value={industry} onValueChange={(v) => updateParams({ industry: v, page: 1 })}>
          <SelectTrigger className="h-10 rounded-xl text-sm w-full lg:w-48 bg-muted/30 border-border/60">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRY_OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={size} onValueChange={(v) => updateParams({ size: v, page: 1 })}>
          <SelectTrigger className="h-10 rounded-xl text-sm w-full lg:w-40 bg-muted/30 border-border/60">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {SIZE_OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => updateParams({ sort: v, page: 1 })}>
          <SelectTrigger className="h-10 rounded-xl text-sm w-full lg:w-40 bg-muted/30 border-border/60">
            <ListFilter className="h-3.5 w-3.5 text-muted-foreground/60 mr-1" />
            <SelectValue placeholder="Sort" />
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <CompanyCard isPrivete={false} key={company._id} company={company} />
        ))}
      </div>

      {companies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-muted-foreground">No companies match your filters.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
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
    </Wrapper>
  );
}