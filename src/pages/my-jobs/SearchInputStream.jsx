"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function SearchInputStream({ initialValue = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialValue);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!search) {
          current.delete("search");
        } else {
          current.set("search", search);
        }
        current.set("page", "1");
        
        const query = current.toString();
        router.push(`${pathname}${query ? `?${query}` : ""}`);
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
      <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
        <SearchIcon className="h-4 w-4" />
      </InputGroupAddon>
      <InputGroupInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search job listings..."
        className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
      />
    </InputGroup>
  );
}