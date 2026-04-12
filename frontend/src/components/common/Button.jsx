export function Button({ children, onClick, variant = "primary", type = "button", size = "md" }) {
  return (
    <button type={type} className={`btn btn--${variant} btn--${size}`} onClick={onClick}>
      {children}
    </button>
  );
}
