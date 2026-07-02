import React from "react";
import MyCompanyWrapper from "../../../../pages/my-companies/MyCompaniesWrapper";
import { companyService } from "@/services/company";

export const metadata = {
  title: "My Companies - KaajBridge",
};

const MyCompaniess = async () => {
  let companies;

  try {
    companies = await companyService.getMyCompany();
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
