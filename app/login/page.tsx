"use client";

import styles from "./page.module.scss";
import LoginForm from "@/components/molecules/LoginForm/LoginForm";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginLabels } from "@/data/labels";
import { type LoginErr, loginSchema } from "@/lib/loginSchema";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export default function LoginPage() {
  const [allErrors, setAllErrors] = useState<LoginErr | null>(null);
  const router = useRouter();

  const loginMutation = useMutation<
    undefined,
    LoginErr,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      // attempt sign-in directly via Auth.js — no custom fetch needed,
      // signIn() handles the network request to Auth.js's own endpoint itself
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // invalid credentials
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw { formErrors: [loginLabels.loginFailedError], fieldErrors: {} };
      }
    },
    onSuccess: () => {
      router.push(`/`);
    },
    onError: (error) => {
      setAllErrors(error);
    },
  });

  const handleSubmit = (email: string, password: string) => {
    const results = loginSchema.safeParse({ email, password });

    if (!results.success) {
      setAllErrors(z.flattenError(results.error));
      return;
    }

    setAllErrors(null);
    loginMutation.mutate({ email, password });
  };

  const clearFieldError = (field: "email" | "password") => {
    setAllErrors((prev) => {
      // if there is no error object - this would be null
      if (!prev) return prev;

      return {
        ...prev,
        fieldErrors: { ...prev.fieldErrors, [field]: undefined },
      };
    });
  };

  return (
    <div className={styles.loginWrapper}>
      <LoginForm
        handleSubmit={(email, password) => {
          handleSubmit(email, password);
        }}
        isSubmitting={loginMutation.isPending}
        allErrors={allErrors}
        clearFieldError={clearFieldError}
      />
    </div>
  );
}
