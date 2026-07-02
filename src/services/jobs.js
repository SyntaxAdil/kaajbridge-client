import { apiRequest } from "./api-client";

export const jobService = {
  getAllJobs: () => apiRequest("/jobs"),
  getLatestJobs: () => apiRequest("/jobs/latest-jobs"),
  getJobById: (id) => apiRequest(`/jobs/${id}`),
  createJob: (jobData) => apiRequest("/jobs", { method: "POST", body: JSON.stringify(jobData) }),
  getMyJobs: () => apiRequest("/jobs/my-jobs"),
  updateJob: (id, jobData) => apiRequest(`/jobs/my-jobs/${id}`, { method: "PATCH", body: JSON.stringify(jobData) }),
  deleteJob: (id) => apiRequest(`/jobs/my-jobs/${id}`, { method: "DELETE" }),
};