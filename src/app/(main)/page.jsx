import { apiRequest } from "@/services/api-client";
import { FAQ } from "../../pages/home/FAQ";
import { FeaturedCompanies } from "../../pages/home/FeaturedCompanies";
import { FeaturedJobs } from "../../pages/home/FeaturedJobs";
import Banner from "../../section/Banner";

const Home = async () => {
  const [companies, jobs] = await Promise.all([
    apiRequest("/company?page=1&limit=20&sort=newest"),
    apiRequest("/jobs?sort=newest&page=1&limit=4"),
  ]);

  const bannerStats = {
    totalCompanies: companies?.totalCompany ?? 0,
    totalJobs: jobs?.totalJobs ?? 0,
  };

  return (
    <div>
      <Banner initialStats={bannerStats} />
      <FeaturedJobs initialJobs={jobs?.data} initialTotalJobs={jobs?.totalJobs} />
      <FeaturedCompanies initialCompanies={companies?.data} />
      <FAQ />
    </div>
  );
};

export default Home;