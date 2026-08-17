"use client";

import styles from "./page.module.scss";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setError("Login failed, please try again");
    } else {
      // success - redirect
      void router.push(`/`);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <label className={styles.field}>
          <span>Email</span>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <Button
          type="submit"
          label={isSubmitting ? "Logging in..." : "Log in"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
