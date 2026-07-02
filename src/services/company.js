import { apiRequest } from "./api-client";
export const companyService = {
  getAllCompanies: () => apiRequest("/company"),
  getTopCompanies: () => apiRequest("/company/top-companies"),
  getCompanyById: (id) => apiRequest(`/company/${id}`),
  createCompany: (companyData) => apiRequest("/company", { method: "POST", body: JSON.stringify(companyData) }),
  getMyCompany: (page = 1, limit = 10) => apiRequest(`/company/my-company?page=${page}&limit=${limit}`),
  updateCompany: (id, companyData) => apiRequest(`/company/my-company/${id}`, { method: "PATCH", body: JSON.stringify(companyData) }),
  deleteCompany: (id) => apiRequest(`/company/my-company/${id}`, { method: "DELETE" }),
};