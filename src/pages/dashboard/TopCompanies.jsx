"use client";

import React from "react";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function TopCompanies({ initialCompanies = [], role = "recruiter" }) {
  const displayTitle = role === "admin" ? "System Core Companies" : "My Registered Companies";
  const redirectUrl = role === "admin" ? "/dashboard/admin/companies" : "/dashboard/my-companies";

  return (
    <div className="w-full lg:w-[400px] bg-card rounded-2xl border border-border p-6 flex flex-col justify-between self-stretch">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {displayTitle}
          </h2>
          <Link 
            href={redirectUrl} 
            className="text-muted-foreground text-sm p-0 h-auto hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-5 mb-6">
          {!initialCompanies || initialCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl bg-muted/10">
              <Building2 className="h-8 w-8 text-muted-foreground/40 mb-2 stroke-[1.5]" />
              <p className="text-xs text-muted-foreground/70 font-medium">No company data pipeline detected.</p>
            </div>
          ) : (
            initialCompanies.slice(0, 4).map((company) => (
              <div key={company._id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-xl bg-muted/60 border border-border/50 flex items-center justify-center overflow-hidden shrink-0">
                    {company.companyLogo ? (
                      <img 
                        src={company.companyLogo} 
                        alt={company.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors stroke-[1.8]" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight leading-none mb-1.5 truncate max-w-[180px]">
                      {company.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 font-medium truncate max-w-[180px] capitalize">
                      {company.industry || "Technology"} • {company.location || company.address?.city || "Dhaka"}
                    </p>
                  </div>
                </div>
                
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-foreground block leading-none mb-1 capitalize px-2 py-1 rounded bg-muted/80 border border-border">
                    {company.verificationStatus || "Verified"}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">
                    Status
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Link 
        href={redirectUrl}  
        className="w-full py-3.5 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 text-foreground font-medium text-sm transition-colors mt-2 text-center block"
      >
        View Management Dashboard
      </Link>
    </div>
  );
}