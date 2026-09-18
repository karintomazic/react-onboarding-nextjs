"use client";

import styles from "./page.module.scss";
import { signOut } from "next-auth/react";
import { profilePageLabels } from "@/data/labels";
import ConfirmModal from "@/components/molecules/ConfirmModal/ConfirmModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useBanner } from "@/hooks/useBanner";
import { useRouter } from "next/navigation";
import { z } from "zod";

type ProfilePageContentProps = {
  email: string;
};

const errorResponseSchema = z.object({
  error: z.string(),
});

export default function ProfilePageContent({ email }: ProfilePageContentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showBanner } = useBanner();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch {
      showBanner(profilePageLabels.signOutError, "error");
    }
  };

  const handleDeleteModalOpen = () => {
    setModalOpen(true);
  };

  const onConfirm = () => {
    deleteAccountMutation.mutate();
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const { error } = errorResponseSchema.parse(await response.json());
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setModalOpen(false);
      void handleSignOut(); // fire and forget
      showBanner(profilePageLabels.deleteSuccessMessage, "success");
    },
    onError: () => {
      setModalOpen(false);
      showBanner(profilePageLabels.deleteErrorMessage, "error");
    },
  });

  return (
    <div className={styles.profile}>
      <h2>{profilePageLabels.heading}</h2>

      <section className={styles.infoSection}>
        <div className={styles.infoRow}>
          <span className={styles.label}>{profilePageLabels.emailLabel}</span>
          <span className={styles.value}>{email}</span>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <div className={styles.dangerText}>
          <h3>{profilePageLabels.deleteAccountHeading}</h3>
          <p>{profilePageLabels.deleteAccountMessage}</p>
        </div>
        <button className={styles.deleteButton} onClick={handleDeleteModalOpen}>
          {profilePageLabels.deleteAccountButton}
        </button>

        {modalOpen && (
          <ConfirmModal
            title={profilePageLabels.deleteConfirmTitle}
            message={profilePageLabels.deleteAccountMessage}
            confirmLabel={profilePageLabels.deleteAccountButton}
            cancelLabel={profilePageLabels.cancelLabel}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isPending={deleteAccountMutation.isPending}
          />
        )}
      </section>
    </div>
  );
}
