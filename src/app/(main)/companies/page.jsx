import React from "react";
import { companyService } from "../../../services/company";
import CompaniesWrapper from "../../../pages/companies/CompaniesWrapper";

export const metadata = {
  title: "Companies - KaajBridge",
  description: "Browse verified companies hiring diploma engineers on KaajBridge.",
};

const Companies = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const industry = params?.industry || "";
  const location = params?.location || "";
  const size = params?.size || "";
  const sort = params?.sort || "newest";

  let companies = {
    success: false,
    data: [],
    totalCompany: 0,
    currentPage: 1,
    totalPages: 1,
  };

  try {
    companies = await companyService.getAllCompanies({
      page,
      search,
      industry,
      location,
      size,
      sort,
    });
  } catch (error) {
    console.error("Failed to pre-fetch companies:", error);
  }

  return <CompaniesWrapper initialCompanies={companies} />;
};

export default Companies;