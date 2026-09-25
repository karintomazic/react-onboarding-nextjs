import styles from "./Input.module.scss";
import type { ChangeEvent, FocusEvent, Ref } from "react";

export type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  type?: "text" | "search" | "password" | "email";
  ref?: Ref<HTMLInputElement>;
};

export default function Input({
  value,
  onChange,
  onClick,
  onBlur,
  placeholder,
  ariaLabel,
  type = "text",
  ref,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={styles.input}
      ref={ref}
    />
  );
}
