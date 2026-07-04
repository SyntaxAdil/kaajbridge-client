"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export default function DeleteApplication({ id }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      const { applicationService } = await import("@/services/applicationService");
      await applicationService.deleteApplication(id);
      startTransition(() => {
        setIsOpen(false);
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="h-8 w-8 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl border border-border bg-card p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">
              Delete Application
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              Are you sure you want to completely discard this record? This process cannot be reversed safely.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-2.5 mt-6">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
              className="rounded-xl border-border/60 text-xs font-semibold h-9"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
              className="rounded-xl text-xs font-semibold h-9 bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isPending ? "Discarding..." : "Confirm Discard"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}