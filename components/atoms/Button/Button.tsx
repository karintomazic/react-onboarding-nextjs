import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "defaultBtn" | "languageBtn" | "resetBtn";
  className?: string;
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
};

export default function Button({
  label,
  onClick,
  type = "button",
  variant = "defaultBtn",
  className,
  disabled,
  "aria-expanded": ariaExpanded,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles[variant], className)}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
