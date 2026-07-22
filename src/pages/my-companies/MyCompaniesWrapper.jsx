"use client";

import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Plus, SearchIcon, ListFilter, Building2 } from "lucide-react";
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
import { SidebarTrigger } from "../../components/ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../../components/ui/pagination";
import CompanyCard from "./CompanyCard";

const STATUS_FILTERS = [
  { value: "all", label: "All Statuses" },
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
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

export default function MyCompanyWrapper({ initialCompanies }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsedCompanies = Array.isArray(initialCompanies?.data)
    ? initialCompanies.data
    : Array.isArray(initialCompanies)
      ? initialCompanies
      : [];

  const parsedPagination = initialCompanies?.pagination || {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const [companies, setCompanies] = useState(parsedCompanies);
  const [pagination, setPagination] = useState(parsedPagination);

  const [prevInitialCompanies, setPrevInitialCompanies] = useState(initialCompanies);

  if (initialCompanies !== prevInitialCompanies) {
    setCompanies(parsedCompanies);
    setPagination(parsedPagination);
    setPrevInitialCompanies(initialCompanies);
  }

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const statusFilter = searchParams.get("status") || "all";

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

  const goToPage = (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.page) return;
    updateParams({ page });
  };

  React.useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (searchInput === currentSearch) return;
    const timeout = setTimeout(() => {
      updateParams({ search: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, searchParams, updateParams]);

  const handleStatusChange = (value) => {
    updateParams({ status: value, page: 1 });
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Failed to update company");
      }
      const updatedCompany = result?.data ?? result;
      setCompanies((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? { ...c, ...updatedCompany } : c)),
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/companies/${id}`, { method: "DELETE" });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete company");
      }
      setCompanies((prev) => prev.filter((c) => (c._id || c.id) !== id));
      setPagination((prev) => ({
        ...prev,
        total: Math.max(prev.total - 1, 0),
      }));
      router.refresh();
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  };

  const pageList = buildPageList(pagination.page, pagination.totalPages);

  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-0 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className={"px-6"}></SidebarTrigger>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">My Companies</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your registered companies and their verification states.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-64 lg:w-72">
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
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-10 rounded-xl text-sm w-[150px] shrink-0 bg-muted/30 border-border/60">
              <ListFilter className="h-3.5 w-3.5 text-muted-foreground/60 mr-1" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex items-center justify-between mb-7 px-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{pagination.total}</span> companies registered
        </p>
        <Button
          onClick={() => router.push("/dashboard/my-companies/create")}
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2 shadow-sm transition-all duration-200"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          Register Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {companies.map((company) => (
          <CompanyCard
            key={company._id || company.id}
            company={company}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {companies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-border/50 rounded-2xl bg-muted/5 max-w-md mx-auto my-4 transition-all duration-300">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/60 text-muted-foreground/60 mb-5">
            <Building2 className="h-6 w-6 stroke-[1.5]" />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background p-0.5 shadow-sm">
              <div className="h-full w-full rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px] font-bold">
                ?
              </div>
            </div>
          </div>
          <h3 className="text-sm font-bold text-foreground tracking-tight">No Companies Found</h3>
          <p className="text-xs text-muted-foreground/70 mt-1.5 max-w-[280px] leading-relaxed">
            We couldn&apos;t find any companies matching your selected criteria or search term.
          </p>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(pagination.page - 1);
                }}
                className={!pagination.hasPrevPage ? "pointer-events-none opacity-40" : ""}
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
                    isActive={item === pagination.page}
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
                  goToPage(pagination.page + 1);
                }}
                className={!pagination.hasNextPage ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}