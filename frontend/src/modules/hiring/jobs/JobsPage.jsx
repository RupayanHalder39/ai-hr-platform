import { useMemo, useState } from "react";
import { Plus, Sparkles, Globe, Pencil, Eye } from "lucide-react";
import { Button } from "../../../components/common/Button";
import { Badge } from "../../../components/common/Badge";
import { ClayCard } from "../../../components/common/ClayCard";
import { jobsContent } from "../../../config/jobsContent";

const actionIcons = {
  linkedin: Globe,
  indeed: Globe,
  edit: Pencil,
  view: Eye,
  approve: Sparkles,
};

export function JobsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const cards = useMemo(() => jobsContent.cards, []);
  const { page, labels, actions, form, statusMap, actionLabels } = jobsContent;

  return (
    <section className="jobs">
      <header className="jobs__header">
        <div>
          <h2>{page.title}</h2>
          <p>{page.subtitle}</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus size={16} /> {page.ctaLabel}
        </Button>
      </header>

      <div className="jobs__list">
        {cards.map((job) => (
          <ClayCard key={job.id} className="job-card">
            <div className="job-card__top">
              <div>
                <div className="job-card__title">
                  <h3>{job.title}</h3>
                  {job.aiGenerated && <Badge>{labels.aiGenerated}</Badge>}
                </div>
                <div className="job-card__meta">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              {(() => {
                const statusConfig = statusMap[job.status];
                const label = statusConfig ? labels[statusConfig.labelKey] : job.status;
                const variant = statusConfig ? statusConfig.variant : "outline";
                return <Badge variant={variant}>{label}</Badge>;
              })()}
            </div>
            <p className="job-card__description">{job.description}</p>
            <div className="job-card__footer">
              <span>{job.candidates} candidates</span>
              <span>Created {job.createdAt}</span>
              <div className="job-card__actions">
                {job.actions.map((action) => {
                  const Icon = actionIcons[action] || Globe;
                  const label = actionLabels[action] || action;
                  return (
                    <Button key={action} variant="outline" size="sm">
                      <Icon size={14} /> {label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </ClayCard>
        ))}
      </div>

      {isOpen && (
        <div className="modal">
          <div className="modal__backdrop" onClick={() => setIsOpen(false)} />
          <div className="modal__content">
            <div className="modal__header">
              <h3>{form.title}</h3>
              <button className="modal__close" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="ai-toggle">
              <div>
                <p>{form.aiToggleTitle}</p>
                <span>{form.aiToggleSubtitle}</span>
              </div>
              <div className="toggle" />
            </div>

            <div className="form-grid">
              <label>
                {form.fields.title.label}
                <input placeholder={form.fields.title.placeholder} />
              </label>
              <label>
                {form.fields.department.label}
                <input placeholder={form.fields.department.placeholder} />
              </label>
              <label>
                {form.fields.location.label}
                <input placeholder={form.fields.location.placeholder} />
              </label>
              <label>
                {form.fields.type.label}
                <input placeholder={form.fields.type.placeholder} />
              </label>
            </div>

            <div className="ai-description">
              <div className="ai-description__header">
                <span>{form.descriptionLabel}</span>
                <Button size="sm" variant="outline">
                  <Sparkles size={14} /> {actions.generate}
                </Button>
              </div>
              <div className="ai-description__body">{form.descriptionPlaceholder}</div>
            </div>

            <div className="modal__actions">
              <Button>{actions.create}</Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {actions.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
