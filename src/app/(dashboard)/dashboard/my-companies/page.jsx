import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import MyCompanyWrapper from "../../../../pages/my-companies/MyCompaniesWrapper";
import AdminCompaniesWrapper from "../../../../pages/admin-companies/AdminCompaniesWrapper";
import { companyService } from "@/services/company";

export const metadata = {
  title: "My Companies - KaajBridge",
};

const MyCompaniess = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const status = params?.status || "";

  const sessionHeaders = await headers();
  const session = await auth.api.getSession({ headers: sessionHeaders });
  const role = session?.user?.role;

  if (role === "seeker") {
    redirect("/dashboard");
  }

  if (role === "admin") {
    let adminCompanies = {
      success: false,
      data: [],
      totalCompany: 0,
      currentPage: 1,
      totalPages: 1,
    };

    try {
      adminCompanies = await companyService.getAllCompaniesAdmin({ page, search, status });
    } catch (error) {
      console.error("Failed to pre-fetch companies on server:", error);
    }

    return <AdminCompaniesWrapper initialCompanies={adminCompanies} />;
  }

  if (role === "recruiter") {
    let companies = {
      success: false,
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    };

    try {
      companies = await companyService.getMyCompany({ page, search, status });
    } catch (error) {
      console.error("Failed to pre-fetch companies on server:", error);
    }

    return <MyCompanyWrapper initialCompanies={companies} />;
  }

  redirect("/dashboard");
};

export default MyCompaniess;