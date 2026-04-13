import { Search } from "lucide-react";
import { uiText } from "../../../config/uiText";

export function FilterBar({ filters, onChange, stages, jobs, scoreOptions }) {
  return (
    <div className="candidates-filter">
      <div className="candidates-filter__search">
        <Search size={16} />
        <input
          type="text"
          placeholder={uiText.candidates.searchPlaceholder}
          value={filters.search || ""}
          onChange={(event) => onChange({ search: event.target.value })}
        />
      </div>
      <select
        className="candidates-filter__select"
        value={filters.stage_id || ""}
        onChange={(event) => onChange({ stage_id: event.target.value || undefined })}
      >
        <option value="">{uiText.candidates.allStages}</option>
        {stages.map((stage) => (
          <option key={stage.id} value={stage.id}>
            {stage.name}
          </option>
        ))}
      </select>
      <select
        className="candidates-filter__select"
        value={filters.job_id || ""}
        onChange={(event) => onChange({ job_id: event.target.value || undefined })}
      >
        <option value="">{uiText.candidates.allJobs}</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
      <select
        className="candidates-filter__select"
        value={filters.score_min || ""}
        onChange={(event) => onChange({ score_min: event.target.value || undefined })}
      >
        <option value="">{uiText.candidates.allScores}</option>
        {scoreOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
