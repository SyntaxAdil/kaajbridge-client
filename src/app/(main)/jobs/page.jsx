import React from "react";

import JobsWrapper from "../../../pages/browse-jobs/JobsWrapper";
import { jobService } from "../../../services/jobs";

export const metadata = {
  title: "Jobs - KaajBridge",
  description: "Browse available job posts for diploma engineers on KaajBridge.",
};

const Jobs = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params?.page || "1";
  const search = params?.search || "";
  const type = params?.type || "";
  const experience = params?.experience || "";
  const location = params?.location || "";
  const sort = params?.sort || "newest";

  let initialJobs = {
    success: false,
    data: [],
    totalJobs: 0,
    currentPage: 1,
    totalPages: 1,
  };

  try {
    initialJobs = await jobService.getAllJobs({
      page,
      search,
      type,
      experience,
      location,
      sort,
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  return <JobsWrapper initialJobs={initialJobs} />;
};

export default Jobs;