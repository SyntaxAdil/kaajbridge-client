"use client";

import React, { useState } from "react";
import { Building2, MapPin, Layers, DollarSign, Calendar, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import EditJob from "./EditJob";
import DeleteJobs from "./DeleteJobs";

export default function JobCard({ job, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const jobStatus = job?.status?.toLowerCase() || "";
  const isActive = jobStatus === "active" || jobStatus === "approved" || jobStatus === "open";

  return (
    <div className="group bg-card rounded-2xl border border-border/70 p-5 flex flex-col justify-between hover:border-border hover:shadow-sm transition-all duration-200">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-xl border border-border/60 bg-muted shrink-0">
              <AvatarImage src={job.companyLogo || job.logo} alt={job.company} />
              <AvatarFallback className="bg-muted text-muted-foreground rounded-xl">
                <Building2 className="h-4.5 w-4.5 stroke-[1.8]" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-150">
                {job.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {job.company}
              </p>
            </div>
          </div>
          <Badge className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border shrink-0 ${
            isActive
              ? "text-emerald-600 border-emerald-500/25 bg-emerald-500/8"
              : "text-amber-600 border-amber-500/25 bg-amber-500/8"
          }`}>
            {job.status}
          </Badge>
        </div>
        <p className="text-xs leading-[1.65] text-muted-foreground line-clamp-3 mb-5">
          {job.description}
        </p>
      </div>

      <div className="pt-4 border-t border-border/40 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-[120px]">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span className="capitalize">{job.experience}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <DollarSign className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span>
              {typeof job.salary === "object" ? (
                <>
                  {job.salary?.currency === "USD" ? "$" : "৳"}
                  {Number(job.salary?.min).toLocaleString() || 0} - {Number(job.salary?.max).toLocaleString() || 0}
                </>
              ) : (
                job.salary
              )}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Ends: {job.applicationDeadline || job.deadline}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/30">
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

      <EditJob 
        isOpen={isEditOpen} 
        setIsOpen={setIsEditOpen} 
        job={job} 
        onUpdate={onUpdate} 
      />

      <DeleteJobs 
        isOpen={isDeleteOpen} 
        setIsOpen={setIsDeleteOpen} 
        job={job} 
        onDelete={onDelete} 
      />
    </div>
  );
}