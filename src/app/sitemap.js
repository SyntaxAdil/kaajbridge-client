import { apiRequest } from "@/services/api-client";

export default async function sitemap() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kaajbridge.vercel.app";

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/companies`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/login`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/register`, changeFrequency: "monthly", priority: 0.3 },
  ];

  let jobRoutes = [];
  let companyRoutes = [];

  try {
    const jobsResult = await apiRequest("/jobs?sort=newest&page=1&limit=100");
    jobRoutes = (jobsResult?.data || []).map((job) => ({
      url: `${SITE_URL}/dashboard/job/${job._id}`,
      lastModified: job.updatedAt || job.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // fail silently — sitemap still returns static routes if the API is down
  }

  try {
    const companiesResult = await apiRequest("/company?page=1&limit=100&sort=newest");
    companyRoutes = (companiesResult?.data || []).map((company) => ({
      url: `${SITE_URL}/companies/${company._id}`,
      lastModified: company.updatedAt || company.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // fail silently
  }

  return [...staticRoutes, ...jobRoutes, ...companyRoutes];
}