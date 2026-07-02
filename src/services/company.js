import { apiRequest } from "./api-client";

export const companyService = {
  getAllCompanies: () => apiRequest("/company"),
  getTopCompanies: () => apiRequest("/company/top-companies"),
  getCompanyById: (id) => apiRequest(`/company/${id}`),
  createCompany: (companyData) => apiRequest("/company", { method: "POST", body: JSON.stringify(companyData) }),
  getMyCompany: () => apiRequest("/company/my-company"),
  updateCompany: (id, companyData) => apiRequest(`/company/my-company/${id}`, { method: "PATCH", body: JSON.stringify(companyData) }),
  deleteCompany: (id) => apiRequest(`/company/my-company/${id}`, { method: "DELETE" }),
};