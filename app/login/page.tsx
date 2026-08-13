"use client";

import styles from "./page.module.scss";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("login");
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
