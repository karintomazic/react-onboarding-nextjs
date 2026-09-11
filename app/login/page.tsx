"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/molecules/LoginForm/LoginForm";
import { loginLabels } from "@/data/labels";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    setIsSubmitting(true);

    // attempt sign-in directly via Auth.js — no custom fetch needed,
    // signIn() handles the network request to Auth.js's own endpoint itself
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      // invalid credentials
      setError(loginLabels.loginFailedError);
    } else {
      // success - redirect
      void router.push(`/`);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <LoginForm
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
}
