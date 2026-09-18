"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // for auto-login once registration succeeds
import RegistrationForm from "@/components/molecules/RegistrationForm/RegistrationForm";
import { z } from "zod";

const registerErrorSchema = z.object({ error: z.string() });

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
      const { error } = registerErrorSchema.parse(await response.json());
      setError(error);
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
        handleSubmit={(email, password) => void handleSubmit(email, password)}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
}
