"use client";

import { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import styles from "./RegistrationForm.module.scss";
import type { SubmitEvent } from "react";
import { registerLabels } from "@/data/labels";

type RegistrationFormProps = {
  handleSubmit: (email: string, password: string) => void;
  isSubmitting: boolean;
  error: string;
};

export default function RegistrationForm({
  handleSubmit,
  isSubmitting,
  error,
}: RegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  return (
    <form className={styles.registrationForm} onSubmit={onSubmit}>
      <h2>{registerLabels.heading}</h2>

      <label className={styles.field}>
        <span>{registerLabels.email}</span>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={registerLabels.emailPlaceholder}
        />
      </label>

      <label className={styles.field}>
        <span>{registerLabels.password}</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={registerLabels.passwordPlaceholder}
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button
        type="submit"
        label={
          isSubmitting
            ? registerLabels.creatingAccount
            : registerLabels.createAccount
        }
        disabled={isSubmitting}
      />
    </form>
  );
}
