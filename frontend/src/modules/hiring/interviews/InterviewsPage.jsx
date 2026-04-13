import { uiText } from "../../../config/uiText";

export function InterviewsPage() {
  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>{uiText.placeholders.interviewsTitle}</h1>
          <p>{uiText.placeholders.subtitle}</p>
        </div>
      </header>
      <div className="card">
        <div className="card__body">{uiText.placeholders.body}</div>
      </div>
    </section>
  );
}
