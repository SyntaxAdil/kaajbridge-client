import { apiRequest } from "./api-client";

export const favoriteService = {

  addToFavorites: (jobId) => apiRequest(`/favorites/${jobId}`, { method: "POST" }),


  getFavorites: () => apiRequest("/favorites"),


  removeFromFavorites: (jobId) => apiRequest(`/favorites/${jobId}`, { method: "DELETE" }),
};