import { useEffect, useMemo, useState } from "react";
import { ClayCard } from "../../../components/common/ClayCard";
import { ClaySpinner } from "../../../components/common/ClaySpinner";
import { EmptyState } from "../../../components/common/EmptyState";
import { useCandidates } from "../../../hooks/useCandidates";
import { settingsApi } from "../../../services/settings";
import { uiText } from "../../../config/uiText";
import { FilterBar } from "./FilterBar";
import { CandidateCardList } from "./CandidateCardList";

const buildScoreOptions = (scores) => {
  if (!scores.length) return [];
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const options = [];
  for (let value = Math.floor(max / 10) * 10; value >= Math.floor(min / 10) * 10; value -= 10) {
    options.push({ value, label: `${uiText.candidates.scorePrefix} ${value}` });
  }
  return options;
};

export function CandidatesPage() {
  const { data, meta, filters, setFilters, loading, error, reload } = useCandidates({});
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

  const scoreOptions = useMemo(() => {
    const scores = data.map((item) => item.score).filter((score) => Number.isFinite(score));
    return buildScoreOptions(scores);
  }, [data]);

  const handleFilterChange = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  return (
    <section className="candidates">
      <header className="candidates__header">
        <div>
          <h1>{uiText.candidates.title}</h1>
          <p>
            {data.length} {uiText.candidates.ofLabel} {meta.total} {uiText.candidates.countLabel}
          </p>
        </div>
        <span className="candidates__count">
          {meta.total} {uiText.candidates.countLabel}
        </span>
      </header>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        stages={stages}
        jobs={jobs}
        scoreOptions={scoreOptions}
      />

      <ClayCard className="candidates-panel">
        {loading && <ClaySpinner label={uiText.candidates.loading} />}
        {error && !loading && <EmptyState message={uiText.common.error} />}
        {!loading && !error && data.length === 0 && <EmptyState message={uiText.common.empty} />}
        {!loading && !error && data.length > 0 && <CandidateCardList candidates={data} />}
      </ClayCard>
    </section>
  );
}
