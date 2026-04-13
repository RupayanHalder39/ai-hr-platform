import { ChevronDown } from "lucide-react";
import { uiText } from "../../../config/uiText";

const avatarPalette = ["lavender", "pink", "mint", "peach", "blue", "rose"];
const stagePalette = ["stage-pink", "stage-purple", "stage-blue", "stage-green", "stage-yellow"];

const hashString = (value = "") =>
  value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const statusVariant = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("active")) return "status-pill--active";
  if (normalized.includes("pending")) return "status-pill--pending";
  return "status-pill--neutral";
};

const scoreVariant = (score) => {
  if (score === null || score === undefined) return "score-pill--neutral";
  if (score >= 90) return "score-pill--green";
  if (score >= 80) return "score-pill--yellow";
  return "score-pill--red";
};

export function CandidateCardList({ candidates = [] }) {
  return (
    <div className="candidates-table">
      <div className="candidates-table__header">
        <span>{uiText.candidates.headers.candidate}</span>
        <span>{uiText.candidates.headers.role}</span>
        <span>{uiText.candidates.headers.stage}</span>
        <span>{uiText.candidates.headers.score}</span>
        <span>{uiText.candidates.headers.status}</span>
        <span>{uiText.candidates.headers.applied}</span>
        <span />
      </div>
      {candidates.map((candidate) => {
        const avatarIndex = hashString(candidate.name) % avatarPalette.length;
        const stageIndex = hashString(candidate.stage_name) % stagePalette.length;
        return (
          <div key={candidate.id} className="candidates-table__row">
            <div className="candidate-cell">
              <div className={`candidate-avatar avatar--${avatarPalette[avatarIndex]}`}>
                {initials(candidate.name)}
              </div>
              <div>
                <div className="candidate-name">{candidate.name}</div>
                <div className="candidate-email">{candidate.email_subtitle}</div>
              </div>
            </div>
            <div className="candidate-role">{candidate.job_title}</div>
            <div className={`pill ${stagePalette[stageIndex]}`}>{candidate.stage_name}</div>
            <div className={`pill ${scoreVariant(candidate.score)}`}>
              {candidate.score ?? uiText.common.na}
            </div>
            <div className={`pill ${statusVariant(candidate.status)}`}>{candidate.status}</div>
            <div className="candidate-date">{candidate.applied_date}</div>
            <ChevronDown size={18} className="candidate-chevron" />
          </div>
        );
      })}
    </div>
  );
}
