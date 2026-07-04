import React from "react";
import MyJobsWrapper from "@/pages/my-jobs/MyJobsWrapper";
import { jobService } from "../../../../services/jobs";
import { companyService } from "../../../../services/company";

export const metadata = {
  title: "My Jobs - KaajBridge",
  description:
    "Control your published configurations and engineering job boards.",
};

export default async function MyJobsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const status = params?.status || "";
  const page = params?.page || "1";

  let initialData = { data: [], pagination: { total: 0 } };
  try {
    initialData = await jobService.getMyJobsServerSide({
      search,
      status,
      page,
    });
  } catch (error) {
    console.error("Failed fetching jobs on server context:", error);
  }

  const myCompaniesName = await companyService
    .getMyCompany()
    .then((res) => res.allCompanyName);

  return (
    <MyJobsWrapper
      myCompaniesName={myCompaniesName}
      initialJobs={initialData?.data || []}
      initialTotal={initialData?.pagination?.total || 0}
      searchParams={{ search, status, page }}
    />
  );
}
