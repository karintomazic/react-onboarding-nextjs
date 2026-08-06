"use client";

import styles from "./Input.module.scss";
import type { ChangeEvent, Ref } from "react";

export type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  type?: "text" | "search";
  ref?: Ref<HTMLInputElement>;
};

export default function Input({
  value,
  onChange,
  onClick,
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
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={styles.input}
      ref={ref}
    />
  );
}
