import { useEffect, useMemo, useState } from "react";
import { Database, Plus } from "lucide-react";
import { Badge } from "../../../components/common/Badge";
import { ClayCard } from "../../../components/common/ClayCard";
import { ClaySpinner } from "../../../components/common/ClaySpinner";
import { EmptyState } from "../../../components/common/EmptyState";
import { Button } from "../../../components/common/Button";
import { jobsApi } from "../../../services/jobs";
import { uiText } from "../../../config/uiText";

const statusVariant = (label = "") => {
  const key = label.toLowerCase();
  if (key.includes("publish")) return "status-published";
  if (key.includes("draft")) return "status-draft";
  if (key.includes("close")) return "status-closed";
  return "outline";
};

const formatDate = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

function JobCard({ job }) {
  return (
    <ClayCard className="job-card">
      <div className="job-card__top">
        <div>
          <div className="job-card__title">
            <h3>{job.title}</h3>
          </div>
        </div>
        {job.status_name && (
          <Badge variant={statusVariant(job.status_name)}>{job.status_name}</Badge>
        )}
      </div>
      <p className="job-card__description">{job.description}</p>
      <div className="job-card__footer">
        <span className="job-card__created">
          {uiText.jobs.created} {formatDate(job.created_at)}
        </span>
        <span className="job-card__db">
          <Database size={14} /> {uiText.jobs.sourceBadge}
        </span>
      </div>
    </ClayCard>
  );
}

export function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await jobsApi.list({ page: 1, page_size: 25 });
        setJobs(response.data || []);
      } catch (err) {
        setError(uiText.jobs.error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = useMemo(() => jobs, [jobs]);

  return (
    <section className="jobs">
      <header className="jobs__header">
        <div>
          <h2>{uiText.jobs.title}</h2>
          <p>{uiText.jobs.subtitle}</p>
        </div>
        <Button>
          <Plus size={16} /> {uiText.jobs.create}
        </Button>
      </header>

      <div className="jobs__subheader">
        <h3>{uiText.jobs.pageTitle}</h3>
        <span>{uiText.jobs.pageSubtitle}</span>
      </div>

      <div className="jobs__list">
        {loading && (
          <ClayCard className="job-card">
            <ClaySpinner label={uiText.jobs.loading} />
          </ClayCard>
        )}
        {error && !loading && (
          <ClayCard className="job-card">
            <EmptyState message={error} />
          </ClayCard>
        )}
        {!loading && !error && cards.length === 0 && (
          <ClayCard className="job-card">
            <EmptyState message={uiText.jobs.empty} />
          </ClayCard>
        )}
        {cards.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
