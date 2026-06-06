"use client";

import React, { useState } from "react";
import { Building2, MapPin, Users, Globe, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"; 
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import EditCompany from "./EditCompany";
import DeleteCompany from "./DeleteCompany";

export default function CompanyCard({ company, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const companyStatus = company?.status?.toLowerCase() || "";
  const isApproved = companyStatus === "approved" || companyStatus === "active";

  return (
    <div className="group bg-card rounded-2xl border border-border/70 p-5 flex flex-col justify-between hover:border-border hover:shadow-sm transition-all duration-200">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-xl border border-border/60 bg-muted shrink-0">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="bg-muted text-muted-foreground rounded-xl">
                <Building2 className="h-4.5 w-4.5 stroke-[1.8]" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-150">
                {company.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {company.category}
              </p>
            </div>
          </div>
          <Badge className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border shrink-0 ${
            isApproved
              ? "text-emerald-600 border-emerald-500/25 bg-emerald-500/8"
              : "text-amber-600 border-amber-500/25 bg-amber-500/8"
          }`}>
            {company.status}
          </Badge>
        </div>
        <p className="text-xs leading-[1.65] text-muted-foreground line-clamp-3 mb-5">
          {company.description}
        </p>
      </div>

      <div className="pt-4 border-t border-border/40 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-[120px]">{company.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{company.range}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/30">
          <a
            href={company.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Visit Website</span>
          </a>

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