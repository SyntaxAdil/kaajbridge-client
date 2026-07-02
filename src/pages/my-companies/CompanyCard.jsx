"use client";

import React, { useState } from "react";
import { Building2, MapPin, Users, Globe, Pencil, Trash2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"; 
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import EditCompany from "./EditCompany";
import DeleteCompany from "./DeleteCompany";

export default function CompanyCard({ company, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const locationString = company?.address 
    ? [company.address.street, company.address.city, company.address.country].filter(Boolean).join(", ")
    : "Location not specified";

  const renderVerificationBadge = () => {
    const status = company?.isVerified;
    if (status === true || status === "verified") {
      return (
        <Badge className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border shrink-0 text-emerald-600 border-emerald-500/25 bg-emerald-500/8 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          <span>Verified</span>
        </Badge>
      );
    }
    if (status === "rejected") {
      return (
        <Badge className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border shrink-0 text-rose-600 border-rose-500/25 bg-rose-500/8 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          <span>Rejected</span>
        </Badge>
      );
    }
    return (
      <Badge className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border shrink-0 text-amber-600 border-amber-500/25 bg-amber-500/8 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </Badge>
    );
  };

  return (
    <div className="group bg-card rounded-2xl border border-border/70 p-5 flex flex-col justify-between hover:border-border hover:shadow-sm transition-all duration-200">
      <div>
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-11 w-11 rounded-xl border border-border/60 bg-muted shrink-0 p-0.5">
              <AvatarImage src={company?.companyLogo} alt={company?.name} className="object-contain rounded-xl" />
              <AvatarFallback className="bg-muted text-muted-foreground rounded-xl">
                <Building2 className="h-4.5 w-4.5 stroke-[1.8]" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-150">
                {company?.name || "Unnamed Company"}
              </h3>
              <p className="text-xs text-muted-foreground capitalize mt-0.5 truncate">
                {company?.industry || "Other"}
              </p>
            </div>
          </div>
          {renderVerificationBadge()}
        </div>
        <p className="text-xs leading-[1.65] text-muted-foreground line-clamp-3 mb-5">
          {company?.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-border/40 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span className="truncate" title={locationString}>{locationString}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Users className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>{company?.size || "N/A"} Employees</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/30">
          {company?.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Visit Website</span>
            </a>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40 italic select-none">
              <Globe className="h-3.5 w-3.5 opacity-40" />
              <span>No Website</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="h-8 rounded-xl px-3 text-xs font-semibold flex items-center gap-1.5 border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border transition-all duration-150"
            >
              <Pencil className="h-3.5 w-3.5 stroke-[2]" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(true)}
              className="h-8 rounded-xl px-3 text-xs font-semibold flex items-center gap-1.5 border-rose-500/10 bg-rose-500/5 text-rose-500/80 hover:text-rose-600 hover:bg-rose-500/10 hover:border-rose-500/25 transition-all duration-150"
            >
              <Trash2 className="h-3.5 w-3.5 stroke-[2]" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <EditCompany 
        isOpen={isEditOpen} 
        setIsOpen={setIsEditOpen} 
        company={company} 
        onUpdate={onUpdate} 
      />

      <DeleteCompany 
        isOpen={isDeleteOpen} 
        setIsOpen={setIsDeleteOpen} 
        company={company} 
        onDelete={onDelete} 
      />
    </div>
  );
}