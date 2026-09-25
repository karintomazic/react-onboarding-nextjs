import { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import styles from "./RegistrationForm.module.scss";
import type { SubmitEvent } from "react";
import { registerLabels } from "@/data/labels";
import { type RegisterErr, registerSchema } from "@/lib/registerSchema";
import { z } from "zod";
import { getFieldError } from "@/utils/getFieldError";

type RegistrationFormProps = {
  handleSubmit: (email: string, password: string) => void;
  isSubmitting: boolean;
  allErrors: RegisterErr | null;
  clearFieldError: (field: "email" | "password") => void;
};

export default function RegistrationForm({
  handleSubmit,
  isSubmitting,
  allErrors,
  clearFieldError,
}: RegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [edited, setEdited] = useState({ email: false, password: false });

  const localResult = registerSchema.safeParse({ email, password });

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
  const isValid = registerSchema.safeParse({ email, password }).success;
  const isDisabled = isSubmitting || !isValid;

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
            setEdited((prev) => ({ ...prev, email: true }));
          }}
          onBlur={() => {
            if (edited.email) {
              clearFieldError("email");
              setEdited((prev) => ({ ...prev, email: false }));
            }

            setTouched((prev) => ({ ...prev, email: true }));
          }}
          placeholder={registerLabels.emailPlaceholder}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
      </label>

      <label className={styles.field}>
        <span>{registerLabels.password}</span>
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
          placeholder={registerLabels.passwordPlaceholder}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
      </label>

      <Button
        type="submit"
        label={
          isSubmitting
            ? registerLabels.creatingAccount
            : registerLabels.createAccount
        }
        disabled={isDisabled}
      />
      {formError && <p className={styles.error}>{formError}</p>}
    </form>
  );
}
