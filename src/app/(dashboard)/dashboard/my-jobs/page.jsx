import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import MyJobsWrapper from "@/pages/my-jobs/MyJobsWrapper";
import AdminJobsWrapper from "@/pages/admin-jobs/AdminJobsWrapper";
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

  const sessionHeaders = await headers();
  const session = await auth.api.getSession({ headers: sessionHeaders });
  const role = session?.user?.role;

  if (role === "seeker") {
    redirect("/dashboard");
  }

  if (role === "admin") {
    let adminData = { data: [], pagination: { total: 0 } };
    try {
      adminData = await jobService.getAllJobsAdmin({ search, status, page });
    } catch (error) {
      console.error("Failed fetching jobs on server context:", error);
    }

    let allCompaniesName = [];
    try {
      const companyData = await companyService.getAllCompaniesAdmin({ limit: 100 });
      allCompaniesName = companyData?.data?.map((c) => ({
        name: c.name,
        companyLogo: c.companyLogo,
      })) || [];
    } catch (error) {
      console.error("Failed fetching companies on server context:", error);
    }

    return (
      <AdminJobsWrapper
        allCompaniesName={allCompaniesName}
        initialJobs={adminData?.data || []}
        initialTotal={adminData?.pagination?.total || adminData?.totalJobs || 0}
        searchParams={{ search, status, page }}
      />
    );
  }

  if (role === "recruiter") {
    let initialData = { data: [], pagination: { total: 0 } };
    try {
      initialData = await jobService.getMyJobsServerSide({ search, status, page });
    } catch (error) {
      console.error("Failed fetching jobs on server context:", error);
    }

    const myCompaniesName = await companyService
      .getMyCompany()
      .then((res) => res.allCompanyName)
      .catch(() => []);

    return (
      <MyJobsWrapper
        myCompaniesName={myCompaniesName}
        initialJobs={initialData?.data || []}
        initialTotal={initialData?.pagination?.total || 0}
        searchParams={{ search, status, page }}
      />
    );
  }

  redirect("/dashboard");
}