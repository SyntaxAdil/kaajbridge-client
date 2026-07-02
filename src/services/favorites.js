import { apiRequest } from "./api-client";

export const favoriteService = {
  addToFavorites: (jobId) => apiRequest("/favorites", { method: "POST", body: JSON.stringify({ jobId }) }),
  getFavorites: () => apiRequest("/favorites"),
  removeFromFavorites: (id) => apiRequest(`/favorites/${id}`, { method: "PATCH" }),
};