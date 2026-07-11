"use client";

import React, { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { favoriteService } from "../../../../../services/favorites";
import { toast } from "react-hot-toast";

export default function FavButtonClient({ jobId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isFavorited) {
        await favoriteService.removeFromFavorites(jobId);
        setIsFavorited(false);
        toast.success("Removed from saved jobs");
      } else {
        await favoriteService.addToFavorites(jobId);
        setIsFavorited(true);
        toast.success("Added to saved jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const shareJob = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Engineering Job Opportunity",
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          toast.error("Could not share link");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard");
      } catch (err) {
        console.error(err);
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={shareJob}
        className="rounded-xl border-border/60 text-muted-foreground hover:bg-muted transition-colors"
      >
        <Share2 className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleFavorite}
        disabled={isLoading}
        className={`rounded-xl border-border/60 transition-colors ${
          isFavorited
            ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20"
            : "hover:bg-muted text-muted-foreground"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
      </Button>
    </div>
  );
}