import { apiRequest } from "./api-client";

export const applicationService = {
  applyForJob: (applicationData) => apiRequest("/application", { method: "POST", body: JSON.stringify(applicationData) }),
  getMyApplications: () => apiRequest("/application/my-applications"),
  getApplicationById: (id) => apiRequest(`/application/${id}`),
  getJobApplications: (jobId) => apiRequest(`/application/job/${jobId}`),
  updateStatus: (id, status) => apiRequest(`/application/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteApplication: (id) => apiRequest(`/application/${id}`, { method: "DELETE" }),
};