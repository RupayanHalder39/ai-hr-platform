import { useEffect, useState } from "react";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Select } from "../../../components/common/Select";
import { Table } from "../../../components/common/Table";
import { useCandidates } from "../../../hooks/useCandidates";
import { candidatesApi } from "../../../services/candidates";
import { settingsApi } from "../../../services/settings";
import { CandidateForm } from "./CandidateForm";

export function CandidatesPage() {
  const { data, meta, filters, setFilters, loading, error, reload, setMeta } = useCandidates({});
  const [stages, setStages] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      const [stagesResponse, jobsResponse] = await Promise.all([settingsApi.stages(), settingsApi.jobs()]);
      setStages(stagesResponse.data || []);
      setJobs(jobsResponse.data || []);
    };
    loadSettings();
  }, []);

  const handleCreate = async (payload) => {
    await candidatesApi.create(payload);
    reload();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "job_title", label: "Job" },
    { key: "stage_name", label: "Stage" },
    { key: "score", label: "Score" },
    { key: "github_link", label: "GitHub" },
  ];

  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>Candidates</h1>
          <p>Track applicant pipeline with dynamic stages and job links.</p>
        </div>
        <Button onClick={() => reload()}>Refresh</Button>
      </header>

      <div className="card">
        <div className="card__header">Filters</div>
        <div className="card__body grid">
          <Input
            label="Search"
            value={filters.search || ""}
            onChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
          />
          <Select
            label="Stage"
            value={filters.stage_id || ""}
            onChange={(value) => setFilters((prev) => ({ ...prev, stage_id: value }))}
            options={stages.map((stage) => ({ value: stage.id, label: stage.name }))}
          />
          <Select
            label="Job"
            value={filters.job_id || ""}
            onChange={(value) => setFilters((prev) => ({ ...prev, job_id: value }))}
            options={jobs.map((job) => ({ value: job.id, label: job.title }))}
          />
          <Input
            label="Score Min"
            value={filters.score_min || ""}
            onChange={(value) => setFilters((prev) => ({ ...prev, score_min: value }))}
          />
          <Input
            label="Score Max"
            value={filters.score_max || ""}
            onChange={(value) => setFilters((prev) => ({ ...prev, score_max: value }))}
          />
        </div>
      </div>

      {error && <div className="alert">{error}</div>}
      {loading ? <div className="loading">Loading candidates...</div> : <Table columns={columns} data={data} />}

      <div className="pagination">
        <Button
          variant="secondary"
          onClick={() => setMeta((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
        >
          Prev
        </Button>
        <span>
          Page {meta.page} of {Math.max(1, Math.ceil(meta.total / meta.page_size))}
        </span>
        <Button
          variant="secondary"
          onClick={() => setMeta((prev) => ({ ...prev, page: prev.page + 1 }))}
        >
          Next
        </Button>
      </div>

      <CandidateForm stages={stages} jobs={jobs} onSubmit={handleCreate} />
    </section>
  );
}
