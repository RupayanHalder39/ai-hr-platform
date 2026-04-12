import { useState } from "react";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Select } from "../../../components/common/Select";

export function CandidateForm({ stages = [], jobs = [], onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    github_link: "",
    job_id: "",
    stage_id: "",
    score: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.({
      ...form,
      job_id: Number(form.job_id),
      stage_id: Number(form.stage_id),
      score: form.score ? Number(form.score) : null,
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card__header">Add Candidate</div>
      <div className="card__body grid">
        <Input label="Name" value={form.name} onChange={(value) => update("name", value)} />
        <Input label="GitHub" value={form.github_link} onChange={(value) => update("github_link", value)} />
        <Select
          label="Job"
          value={form.job_id}
          onChange={(value) => update("job_id", value)}
          options={jobs.map((job) => ({ value: job.id, label: job.title }))}
        />
        <Select
          label="Stage"
          value={form.stage_id}
          onChange={(value) => update("stage_id", value)}
          options={stages.map((stage) => ({ value: stage.id, label: stage.name }))}
        />
        <Input label="Score" value={form.score} onChange={(value) => update("score", value)} />
      </div>
      <div className="card__footer">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
