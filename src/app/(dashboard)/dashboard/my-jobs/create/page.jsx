import React from "react";
import { companyService } from "@/services/company";
import CreateJobForm from "./CreateJobForm";

export const metadata = {
  title: "Create Job - KaajBridge",
  description: "Publish targeted opportunities designated for engineering professionals.",
};

export default async function CreateJobPage() {
  const myCompaniesName = await companyService.getMyCompany().then((res) => res.allCompanyName);

  return (
    <section className="w-full min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
       

        <div className="px-7 pt-5 pb-7">
          <CreateJobForm myCompaniesName={myCompaniesName} />
        </div>
      </div>
    </section>
  );
}