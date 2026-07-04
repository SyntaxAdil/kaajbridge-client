import { apiRequest } from "./api-client";

export const applicationService = {
  postApplication: (applicationData) => {
    return apiRequest("/application", {
      method: "POST",
      body: JSON.stringify(applicationData),
    });
  },

  getAllApplicationsForRecruiter: ({ page = "1", limit = "10", status = "", jobId = "" } = {}) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);
    if (jobId) queryParams.append("jobId", jobId);

    return apiRequest(`/application/all-job-applications?${queryParams.toString()}`);
  },

  getAllApplicationsForJob: (jobId, { page = "1", limit = "10", status = "" } = {}) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);

    return apiRequest(`/application/job/${jobId}?${queryParams.toString()}`);
  },

  getAllApplicationsAdmin: ({ page = "1", limit = "10", status = "", jobId = "" } = {}) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);
    if (jobId) queryParams.append("jobId", jobId);

    return apiRequest(`/application/admin/all?${queryParams.toString()}`);
  },

  updateApplicationStatus: (id, status) => {
    return apiRequest(`/application/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  deleteApplication: (id) => {
    return apiRequest(`/application/${id}`, {
      method: "DELETE",
    });
  },

  getMyApplications: ({ page = "1", limit = "10", status = "" } = {}) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);

    return apiRequest(`/application/my-applications?${queryParams.toString()}`);
  },

  viewApplicationDetails: (id) => {
    return apiRequest(`/application/${id}`);
  },
};