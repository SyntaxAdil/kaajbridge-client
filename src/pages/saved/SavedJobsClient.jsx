"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ExternalLink, Briefcase } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { favoriteService } from "../../services/favorites";


export default function SavedJobsClient({ initialFavorites, isAuthenticated }) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetJobId, setTargetJobId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Please sign in to view your saved job pipelines.
        </p>
      </div>
    );
  }

  const triggerDeleteConfirmation = (jobId) => {
    setTargetJobId(jobId);
    setIsModalOpen(true);
  };

  const confirmDeleteAction = async () => {
    if (!targetJobId) return;
    setIsDeleting(true);

    try {
      await favoriteService.removeFromFavorites(targetJobId);
      setFavorites((prev) => prev.filter((item) => item.jobId !== targetJobId));
    } catch (error) {
      console.error("Failed to delete favorite record via API:", error);
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setTargetJobId(null);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/70 dark:bg-zinc-900/40 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-all">
              <TableHead className="font-bold text-zinc-700 dark:text-zinc-400">Position</TableHead>
              <TableHead className="font-bold text-zinc-700 dark:text-zinc-400">Company</TableHead>
              <TableHead className="font-bold text-zinc-700 dark:text-zinc-400">Location</TableHead>
              <TableHead className="font-bold text-zinc-700 dark:text-zinc-400">Type</TableHead>
              <TableHead className="font-bold text-zinc-700 dark:text-zinc-400">Deadline</TableHead>
              <TableHead className="text-right font-bold text-zinc-700 dark:text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((item) => (
              <TableRow key={item.jobId} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20">
                <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100 min-w-[200px]">
                  {item.title}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400">{item.company}</TableCell>
                <TableCell className="text-zinc-500 capitalize">{item.location}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize text-[10px] font-medium rounded-md px-2 py-0.5">
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500 text-xs font-medium">{item.deadline}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200">
                      <Link href={`/dashboard/job/${item.jobId}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => triggerDeleteConfirmation(item.jobId)}
                      className="h-8 w-8 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {favorites.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-sm font-medium text-zinc-400 dark:text-zinc-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Briefcase className="h-5 w-5 opacity-40" />
                    <span>No saved jobs found matching your track portfolio list.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Remove Saved Job?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              This will officially remove this position parameters out of your personal dashboard watchlist pipeline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 mt-2">
            <AlertDialogCancel asChild>
              <Button variant="outline" size="sm" className="rounded-xl font-medium text-xs mr-2">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  confirmDeleteAction();
                }}
                disabled={isDeleting}
                className="rounded-xl font-medium text-xs bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
              >
                {isDeleting ? "Removing..." : "Confirm Removal"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}