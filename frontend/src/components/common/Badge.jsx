export function Badge({ children, variant = "outline" }) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
