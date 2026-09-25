import styles from "./LoginForm.module.scss";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { loginLabels } from "@/data/labels";
import { type LoginErr, loginSchema } from "@/lib/loginSchema";
import { z } from "zod";
import { getFieldError } from "@/utils/getFieldError";

type LoginFormProps = {
  handleSubmit: (email: string, password: string) => void;
  isSubmitting: boolean;
  allErrors: LoginErr | null;
  clearFieldError: (field: "email" | "password") => void;
};

export default function LoginForm({
  handleSubmit,
  isSubmitting,
  allErrors,
  clearFieldError,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [edited, setEdited] = useState({ email: false, password: false });

  const localResult = loginSchema.safeParse({ email, password });

  const localFieldErrors = localResult.success
    ? {}
    : z.flattenError(localResult.error).fieldErrors;

  const emailError = getFieldError(
    allErrors?.fieldErrors.email?.[0],
    touched.email,
    localFieldErrors.email?.[0],
  );

  const passwordError = getFieldError(
    allErrors?.fieldErrors.password?.[0],
    touched.password,
    localFieldErrors.password?.[0],
  );

  const formError = allErrors?.formErrors[0];
  const isValid = loginSchema.safeParse({ email, password }).success;
  const isDisabled = isSubmitting || !isValid;

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
          onChange={(e) => {
            setEmail(e.target.value);
            setEdited((prev) => ({ ...prev, email: true }));
          }}
          onBlur={() => {
            if (edited.email) {
              clearFieldError("email");
              setEdited((prev) => ({ ...prev, email: false }));
            }

            setTouched((prev) => ({ ...prev, email: true }));
          }}
          placeholder={loginLabels.emailPlaceholder}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
      </label>

      <label className={styles.field}>
        <span>{loginLabels.password}</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setEdited((prev) => ({ ...prev, password: true }));
          }}
          onBlur={() => {
            if (edited.password) {
              clearFieldError("password");
              setEdited((prev) => ({ ...prev, password: false }));
            }

            setTouched((prev) => ({ ...prev, password: true }));
          }}
          placeholder={loginLabels.passwordPlaceholder}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
      </label>
      <Button
        type="submit"
        label={isSubmitting ? loginLabels.loggingIn : loginLabels.login}
        disabled={isDisabled}
      />
      {formError && <p className={styles.error}>{formError}</p>}
    </form>
  );
}
