import React from "react";
import { companyService } from "../../../services/company";
import CompanyCard from "../../../pages/my-companies/CompanyCard";
import Wrapper from "../../../components/shared/Wrapper";

const Companies = async () => {
  const companies = await companyService
    .getAllCompanies()
    .then((res) => res.data);

  return (
    <div>
      <Wrapper>
        <h1>Companies</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <CompanyCard isPrivete={false} key={company._id} company={company} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Companies;
