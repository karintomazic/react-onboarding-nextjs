"use client";

import styles from "./page.module.scss";
import { useSession, signOut } from "next-auth/react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Link from "next/link";
import { profilePageLabels } from "@/data/labels";

export default function Profile() {
  const session = useSession();
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading";

  const handleSignOut = async () => await signOut({ callbackUrl: "/" });

  const handleDeleteAccount = async () => {
    const response = await fetch("/api/account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // TODO - add better error - maybe the banne once the other branch is merged to dev
    // also add conformation modal
    if (!response.ok) {
      const json = await response.json();
      console.log(json.error);
    } else {
      handleSignOut();
      console.log("response ok");
    }
  };

  if (loggedInLoading) {
    return <Spinner />;
  }

  if (isNotLoggedIn) {
    return (
      <div className={styles.notLoggedIn}>
        <h2>{profilePageLabels.notLoggedInHeading}</h2>
        <p>{profilePageLabels.notLoggedInMessage}</p>
        <div className={styles.notLoggedInActions}>
          <Link href="/login" className={styles.loginLink}>
            {profilePageLabels.loginLink}
          </Link>
          <Link href="/register" className={styles.signUpLink}>
            {profilePageLabels.signUpLink}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <h2>{profilePageLabels.heading}</h2>

      <section className={styles.infoSection}>
        <div className={styles.infoRow}>
          <span className={styles.label}>{profilePageLabels.emailLabel}</span>
          <span className={styles.value}>{session.data?.user?.email}</span>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <div className={styles.dangerText}>
          <h3>{profilePageLabels.deleteAccountHeading}</h3>
          <p>{profilePageLabels.deleteAccountMessage}</p>
        </div>
        <button className={styles.deleteButton} onClick={handleDeleteAccount}>
          {profilePageLabels.deleteAccountButton}
        </button>
      </section>
    </div>
  );
}
