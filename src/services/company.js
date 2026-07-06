import { apiRequest } from "./api-client";

export const companyService = {
  getAllCompanies: ({
    page = 1,
    limit = 12,
    search = "",
    industry = "",
    location = "",
    size = "",
    sort = "newest",
  } = {}) => {
    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    query.set("sort", sort);
    if (search) query.set("search", search);
    if (industry) query.set("industry", industry);
    if (location) query.set("location", location);
    if (size) query.set("size", size);
    return apiRequest(`/company?${query.toString()}`);
  },

  getTopCompanies: () => apiRequest("/company/top-companies"),

  getCompanyById: (id) => apiRequest(`/company/${id}`),

  createCompany: (companyData) =>
    apiRequest("/company", { method: "POST", body: JSON.stringify(companyData) }),

  getMyCompany: ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    if (search) query.set("search", search);
    if (status) query.set("status", status);
    return apiRequest(`/company/my-company?${query.toString()}`);
  },

  updateCompany: (id, companyData) =>
    apiRequest(`/company/my-company/${id}`, { method: "PATCH", body: JSON.stringify(companyData) }),

  deleteCompany: (id) => apiRequest(`/company/my-company/${id}`, { method: "DELETE" }),

  getAllCompaniesAdmin: ({
    page = 1,
    limit = 10,
    search = "",
    status = "",
    industry = "",
    sort = "newest",
  } = {}) => {
    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    query.set("sort", sort);
    if (search) query.set("search", search);
    if (status) query.set("status", status);
    if (industry) query.set("industry", industry);
    return apiRequest(`/company/admin/all?${query.toString()}`);
  },

  deleteCompanyAdmin: (id) => apiRequest(`/company/admin/${id}`, { method: "DELETE" }),

  updateCompanyStatus: (id, status) =>
    apiRequest(`/company/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),

  getCompanyAnalytics: () => apiRequest("/company/analytics/overview"),
};