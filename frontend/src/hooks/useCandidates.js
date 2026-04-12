import { useCallback, useEffect, useState } from "react";
import { candidatesApi } from "../services/candidates";

export function useCandidates(initialFilters = {}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, page_size: 20, total: 0 });
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (overrides = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: meta.page, page_size: meta.page_size, ...filters, ...overrides };
      const response = await candidatesApi.list(params);
      setData(response.data || []);
      setMeta(response.meta || meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, meta.page, meta.page_size]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, meta, filters, setFilters, loading, error, reload: load, setMeta };
}
