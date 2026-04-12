import { useEffect, useState } from "react";
import { Table } from "../../../components/common/Table";
import { jobsApi } from "../../../services/jobs";

export function JobsPage() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, page_size: 20, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await jobsApi.list({ page: meta.page, page_size: meta.page_size });
        setData(response.data || []);
        setMeta(response.meta || meta);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [meta.page, meta.page_size]);

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "status_id", label: "Status" },
  ];

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>Jobs</h1>
          <p>Overview of hiring positions. Data is placeholder-ready for future integrations.</p>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}
      {loading ? <div className="loading">Loading jobs...</div> : <Table columns={columns} data={data} />}
    </section>
  );
}
