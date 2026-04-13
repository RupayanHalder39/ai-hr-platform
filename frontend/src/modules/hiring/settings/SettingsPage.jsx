import { uiText } from "../../../config/uiText";

export function SettingsPage() {
  return (
    <section className="page">
      <header className="page__header">
        <div>
          <h1>{uiText.settings.hiringTitle}</h1>
          <p>{uiText.settings.hiringSubtitle}</p>
        </div>
      </header>
      <div className="card">
        <div className="card__body">{uiText.placeholders.body}</div>
      </div>
    </section>
  );
}
