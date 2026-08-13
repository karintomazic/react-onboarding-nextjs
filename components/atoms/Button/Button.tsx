"use client";

import styles from "./Button.module.scss";

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "language" | "reset";
  className?: string;
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
};

export default function Button({
  label,
  onClick,
  type = "button",
  variant = "default",
  className,
  disabled,
  "aria-expanded": ariaExpanded,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant] ?? ""} ${className ?? ""}`}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
