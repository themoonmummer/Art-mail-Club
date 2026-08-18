import "./Button.css";

function Button({
  text,
  variant = "primary",
  size = "large",
  onClick,
}) {
  return (
    <button
      className={`button ${variant} ${size}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;