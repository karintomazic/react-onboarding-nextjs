import styles from "./Input.module.scss";
import type { ChangeEvent, FocusEvent, Ref } from "react";

export type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  type?: "text" | "search" | "password" | "email";
  ref?: Ref<HTMLInputElement>;
  role?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaActiveDescendant?: string;
};

export default function Input({
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  placeholder,
  ariaLabel,
  type = "text",
  ref,
  role,
  ariaExpanded,
  ariaControls,
  ariaActiveDescendant,
}: InputProps) {
  return (
    <input
      type={type}
      role={role}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-activedescendant={ariaActiveDescendant}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={styles.input}
      ref={ref}
    />
  );
}
