import { api } from "./api";

export const settingsApi = {
  stages: () => api.get("/api/v1/hiring/settings/stages"),
  jobs: () => api.get("/api/v1/hiring/settings/jobs"),
  roles: () => api.get("/api/v1/hiring/settings/roles"),
  health: () => api.get("/api/v1/health"),
  statuses: (entityType) => {
    const query = entityType ? `?entity_type=${encodeURIComponent(entityType)}` : "";
    return api.get(`/api/v1/hiring/settings/statuses${query}`);
  },
};
