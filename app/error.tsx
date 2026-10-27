"use client";
import styles from "./error.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import Link from "next/link";
import { errorLabels } from "@/data/labels";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <SingleColumn>
      <div className={styles.error}>
        <h2>{errorLabels.heading}</h2>
        <p className={styles.message}>{errorLabels.message}</p>
        <div className={styles.actions}>
          <button onClick={retry} className={styles.retryButton}>
            {errorLabels.retryButton}
          </button>
          <Link href="/" className={styles.homeLink}>
            {errorLabels.homeLink}
          </Link>
        </div>
      </div>
    </SingleColumn>
  );
}
