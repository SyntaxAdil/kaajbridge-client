"use client";

import React, { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import toast from "react-hot-toast";

export default function DeleteCompany({
  isOpen,
  setIsOpen,
  company,
  onDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      if (onDelete) {
        await onDelete(company?._id || company?.id);
        toast.success("Company deleted successfully");
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl border border-border bg-card p-6">
        <DialogHeader className="flex flex-col items-center text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
            <AlertTriangle className="h-6 w-6 stroke-[2]" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold tracking-tight">
              Delete Company Profile?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                &apos;{company?.name}&apos;
              </span>
              ? This action is permanent and will cascade into associated job
              boards.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-3 mt-4 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
            className="h-10 rounded-xl text-xs font-semibold w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-10 rounded-xl text-xs font-semibold w-full flex items-center justify-center gap-1.5 border border-rose-500/10 bg-rose-500/5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 hover:border-rose-500/25 transition-all duration-150"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}