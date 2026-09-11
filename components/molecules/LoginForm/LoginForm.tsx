"use client";

import styles from "./LoginForm.module.scss";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { loginLabels } from "@/data/labels";

type LoginFormProps = {
  handleSubmit: (email: string, password: string) => void;
  isSubmitting: boolean;
  error: string;
};

export default function LoginForm({
  handleSubmit,
  isSubmitting,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <h2>{loginLabels.login}</h2>

      <label className={styles.field}>
        <span>{loginLabels.email}</span>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={loginLabels.emailPlaceholder}
        />
      </label>

      <label className={styles.field}>
        <span>{loginLabels.password}</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={loginLabels.passwordPlaceholder}
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button
        type="submit"
        label={isSubmitting ? loginLabels.loggingIn : loginLabels.login}
        disabled={isSubmitting}
      />
    </form>
  );
}
