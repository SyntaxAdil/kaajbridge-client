import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import ApplicationsTable from "../../../../pages/applications/ApplicationsTable";
import ApplicationViewModal from "../../../../pages/applications/ApplicationViewModal";
import FilterApplication from "../../../../pages/applications/FilterApplication";
import { applicationService } from "../../../../services/applications";

export const metadata = {
  title: "Applications - KaajBridge",
};

const emptyResult = {
  data: [],
  pagination: { total: 0, page: 1, limit: 10, pages: 1 },
};

export default async function ApplicationsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "";
  const page = resolvedParams.page || "1";
  const limit = resolvedParams.limit || "10";

  const sessionHeaders = await headers();
  const session = await auth.api.getSession({ headers: sessionHeaders });
  const role = session?.user?.role;

  let initialData = emptyResult;
  let pageTitle = "Applications";
  let pageSubtitle = "";

  try {
    if (role === "admin") {
      initialData = await applicationService.getAllApplicationsAdmin({
        status,
        page,
        limit,
      });
      pageTitle = "All applications";
      pageSubtitle = `${initialData.pagination?.total || 0} applications across all companies`;
    } else if (role === "recruiter") {
      initialData = await applicationService.getAllApplicationsForRecruiter({
        status,
        page,
        limit,
      });
      pageTitle = "Applications";
      pageSubtitle = `${initialData.pagination?.total || 0} applications for your jobs`;
    } else {
      initialData = await applicationService.getMyApplications({
        status,
        page,
        limit,
      });
      pageTitle = "My applications";
      pageSubtitle = `${initialData.pagination?.total || 0} applications submitted`;
    }
  } catch (error) {
    console.error(error);
  }

  const createPageLink = (pageNum) => {
    const params = new URLSearchParams({
      search,
      status,
      page: pageNum.toString(),
      limit,
    });
    return `?${params.toString()}`;
  };

  const canEditStatus = role === "recruiter" || role === "admin";
  const canDelete =
    role === "recruiter" || role === "admin" || role === "seeker";

  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-10 py-8">
      {/* <div className="mb-2">
        <h1 className="text-xl font-bold text-foreground">{pageTitle}</h1>
        
      </div> */}
      <FilterApplication
        currentSearch={search}
        currentStatus={status}
        pageSubtitle={
          role !== "seeker"
            ? pageSubtitle
            : "Review, track, and manage student job applications."
        }
      />
      <ApplicationsTable
        applications={initialData.data || []}
        role={role}
        canEditStatus={canEditStatus}
        canDelete={canDelete}
        pagination={initialData.pagination}
        createPageLink={createPageLink}
      />
      <ApplicationViewModal applicationId={resolvedParams.view} />{" "}
    </section>
  );
}
