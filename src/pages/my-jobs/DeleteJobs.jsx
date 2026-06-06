"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export default function DeleteJobs({ isOpen, setIsOpen, job, onDelete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (onDelete) {
        await onDelete(job.id);
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border border-border bg-card p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold tracking-tight text-foreground">
            Delete Job Listing?
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Are you sure you want to completely remove <span className="font-semibold text-foreground">&apos;{job?.title}&apos;</span>? This action cannot be undone and all candidate analytics will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="h-9 rounded-xl text-xs font-semibold">
            Cancel
          </Button>
          <Button type="button" onClick={handleDeleteSubmit} disabled={isSubmitting} className="h-9 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white min-w-[80px]">
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}