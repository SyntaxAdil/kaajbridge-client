import React from "react";
import MyCompanyWrapper from "../../../../pages/my-companies/MyCompaniesWrapper";
import { companyService } from "@/services/company";

export const metadata = {
  title: "My Companies - KaajBridge",
};

const MyCompaniess = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const isVerified = params?.isVerified || "";

  let companies = {
    success: false,
    data: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };

  try {
    companies = await companyService.getMyCompany({ page, search, isVerified });
  } catch (error) {
    console.error("Failed to pre-fetch companies on server:", error);
  }

  
  return (
    <div>
      <MyCompanyWrapper initialCompanies={companies} />
    </div>
  );
};

export default MyCompaniess;