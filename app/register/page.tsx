"use client";

import { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import styles from "./page.module.scss";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    } );
    console.log(response);


  };

  return (
    <div className={styles.registerWrapper}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Create an account</h2>

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
            placeholder="At least 8 characters"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <Button
          type="submit"
          label={isSubmitting ? "Creating account..." : "Create account"}
        />
      </form>
    </div>
  );
}
