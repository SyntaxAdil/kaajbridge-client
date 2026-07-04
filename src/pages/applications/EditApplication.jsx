"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function EditApplication({ id, currentStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = async (newStatus) => {
    try {
      const { applicationService } = await import("@/services/applicationService");
      await applicationService.updateApplicationStatus(id, newStatus);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={isPending ? "opacity-50 pointer-events-none" : "opacity-100"}>
      <Select defaultValue={currentStatus} onValueChange={handleStatusUpdate}>
        <SelectTrigger className="h-8 w-32 rounded-lg border-border/60 bg-transparent text-xs font-medium shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-border bg-card">
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="reviewed">Reviewed</SelectItem>
          <SelectItem value="shortlisted">Shortlisted</SelectItem>
          <SelectItem value="interviewing">Interviewing</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}