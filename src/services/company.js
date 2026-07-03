import { apiRequest } from "./api-client";

export const companyService = {
  getAllCompanies: () => apiRequest("/company"),
  getTopCompanies: () => apiRequest("/company/top-companies"),
  getCompanyById: (id) => apiRequest(`/company/${id}`),
  createCompany: (companyData) =>
    apiRequest("/company", { method: "POST", body: JSON.stringify(companyData) }),
  getMyCompany: ({ page = 1, limit = 10, search = "", isVerified = "" } = {}) => {
    const query = new URLSearchParams();
    query.set("page", page);
    query.set("limit", limit);
    if (search) query.set("search", search);
    if (isVerified) query.set("isVerified", isVerified);
    return apiRequest(`/company/my-company?${query.toString()}`);
  },
  updateCompany: (id, companyData) =>
    apiRequest(`/company/my-company/${id}`, { method: "PATCH", body: JSON.stringify(companyData) }),
  deleteCompany: (id) => apiRequest(`/company/my-company/${id}`, { method: "DELETE" }),
};