import { api } from "./api";

export const jobsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/api/v1/hiring/jobs?${query}`);
  },
};
