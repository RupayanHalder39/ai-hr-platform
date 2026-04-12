export function ClayCard({ children, variant = "white", hover = false, className = "" }) {
  return (
    <div
      className={`clay-card clay-card--${variant} ${hover ? "clay-card--hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function ClayMetricCard({ title, value, change, changeType = "neutral", icon, variant = "white" }) {
  return (
    <ClayCard variant={variant} hover>
      <div className="metric-card">
        <div>
          <p className="metric-card__title">{title}</p>
          <p className="metric-card__value">{value}</p>
          {change && (
            <p className={`metric-card__change metric-card__change--${changeType}`}>{change}</p>
          )}
        </div>
        {icon ? <div className="metric-card__icon">{icon}</div> : null}
      </div>
    </ClayCard>
  );
}
