"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import RegistrationForm from "@/components/molecules/RegistrationForm/RegistrationForm";
import { z } from "zod";
import { registerSchema, RegisterErr } from "@/lib/registerSchema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // for auto-login once registration succeeds
import { useMutation } from "@tanstack/react-query";

function parseRegisterError(json: unknown): RegisterErr {
  const obj = (
    typeof json === "object" && json !== null ? json : {}
  ) as Partial<RegisterErr>;

  if (!obj.fieldErrors && !obj.formErrors) {
    return { formErrors: ["Something went wrong"], fieldErrors: {} };
  }

  return {
    fieldErrors: obj.fieldErrors ?? {},
    formErrors: obj.formErrors ?? [],
  };
}

export default function RegisterPage() {
  const [allErrors, setAllErrors] = useState<RegisterErr | null>(null);
  const router = useRouter();

  const registerMutation = useMutation<
    undefined,
    RegisterErr,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // TanStack Query's onError receives whatever mutationFn throws
        // directly via the TError generic, so a plain typed object here is
        // intentional, not a mistake
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw parseRegisterError(await response.json());
      }
    },
    onSuccess: async (_, { email, password }) => {
      const result = await signIn("credentials", {
        // If registration succeeded, attempts to log the user in
        // with the same credentials they just registered with
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      setAllErrors(error);
    },
  });

  const handleSubmit = (email: string, password: string) => {
    const results = registerSchema.safeParse({ email, password }); // safeParse - never throws, it returns the success true/false

    if (!results.success) {
      setAllErrors(z.flattenError(results.error));
      return;
    }

    setAllErrors(null);
    registerMutation.mutate({ email, password });
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
    <div className={styles.registerWrapper}>
      <RegistrationForm
        handleSubmit={(email, password) => {
          handleSubmit(email, password);
        }}
        isSubmitting={registerMutation.isPending}
        allErrors={allErrors}
        clearFieldError={clearFieldError}
      />
    </div>
  );
}
