"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // for auto-login once registration succeeds
import RegistrationForm from "@/components/molecules/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    setIsSubmitting(true);

    // Sends the registration request to Route Handler
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      // registration failed
      const json = await response.json();
      setError(json.error);
    } else {
      const result = await signIn("credentials", {
        // If registration succeeded, attempts to log the user in with the same credentials they just registered with
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <RegistrationForm
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
}
