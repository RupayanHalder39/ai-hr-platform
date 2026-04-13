export function ClaySpinner({ label }) {
  return (
    <div className="clay-spinner" role="status" aria-live="polite">
      <div className="clay-spinner__dot" />
      {label ? <span className="clay-spinner__label">{label}</span> : null}
    </div>
  );
}
