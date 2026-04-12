import { api } from "./api";

export const candidatesApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/api/v1/hiring/candidates?${query}`);
  },
  get: (id) => api.get(`/api/v1/hiring/candidates/${id}`),
  create: (payload) => api.post("/api/v1/hiring/candidates", payload),
  update: (id, payload) => api.put(`/api/v1/hiring/candidates/${id}`, payload),
  remove: (id) => api.delete(`/api/v1/hiring/candidates/${id}`),
};
