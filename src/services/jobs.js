import { apiRequest } from "./api-client";

export const jobService = {
  getAllJobs: ({ search = "", type = "", experience = "", location = "", sort = "newest", page = "1", limit = "10" } = {}) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (type) queryParams.append("type", type);
    if (experience) queryParams.append("experience", experience);
    if (location) queryParams.append("location", location);
    if (sort) queryParams.append("sort", sort);
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    return apiRequest(`/jobs?${queryParams.toString()}`);
  },

  getLatestJobs: () => apiRequest("/jobs/latest-jobs"),
  getJobById: (id) => apiRequest(`/jobs/${id}`),
  createJob: (jobData) => apiRequest("/jobs", { method: "POST", body: JSON.stringify(jobData) }),
  getMyJobs: () => apiRequest("/jobs/my-jobs"),
  updateJob: (id, jobData) => apiRequest(`/jobs/my-jobs/${id}`, { method: "PATCH", body: JSON.stringify(jobData) }),
  deleteJob: (id) => apiRequest(`/jobs/my-jobs/${id}`, { method: "DELETE" }),

  getMyJobsServerSide: async ({ search = "", status = "", page = "1" }) => {
    const queryParams = new URLSearchParams({ search, status, page }).toString();
    return apiRequest(`/jobs/my-jobs?${queryParams}`, {
      method: "GET",
      cache: "no-store"
    });
  },

  getAllJobsAdmin: async ({ search = "", status = "", type = "", experience = "", company = "", page = "1", limit = "10" } = {}) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (status) queryParams.append("status", status);
    if (type) queryParams.append("type", type);
    if (experience) queryParams.append("experience", experience);
    if (company) queryParams.append("company", company);
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    return apiRequest(`/jobs/admin/all?${queryParams.toString()}`, {
      method: "GET",
      cache: "no-store"
    });
  },

  deleteJobAdmin: (id) => apiRequest(`/jobs/admin/${id}`, { method: "DELETE" }),
};