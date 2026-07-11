import React from "react";
import { favoriteService } from "../../../../services/favorites";
import { auth } from "../../../../lib/auth/auth";
import { headers } from "next/headers";
import SavedJobsClient from "../../../../pages/saved/SavedJobsClient";
import { SidebarTrigger } from "../../../../components/ui/sidebar";

export const metadata = {
  title: "Saved Jobs - KaajBridge",
  description: "Manage your saved and favorited engineering job pipelines.",
};

export default async function SavedJobPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user || null;

  let initialFavorites = [];

  if (user) {
    try {
      const response = await favoriteService.getFavorites();
      if (response && response.success && Array.isArray(response.data)) {
        initialFavorites = response.data
          .filter((fav) => fav && fav.job)
          .map((fav) => ({
            favoriteId: fav._id,
            jobId: typeof fav.job === "object" ? fav.job._id : fav.job,
            title: fav.job?.title || "Untitled Position",
            company: fav.job?.company || "Unknown Company",
            location: fav.job?.location || "Remote / Unspecified",
            type: fav.job?.type || "Full-time",
            deadline: fav.job?.applicationDeadline
              ? new Date(fav.job.applicationDeadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A",
          }));
      }
    } catch (error) {
      console.error("Failed to fetch favorite records server-side:", error);
    }
  }


  return (
    <div className="p-4   space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mx-2" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Saved Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review and manage the engineering positions saved to your pipeline dashboard.
            </p>
          </div>
        </div>
      </header>

      <SavedJobsClient initialFavorites={initialFavorites} isAuthenticated={!!user} />
    </div>
  );
}