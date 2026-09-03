import styles from "./ToastBanner.module.scss";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBanner } from "@/hooks/useBanner";

type ToastBannerProps = {
  message: string;
  top: number;
  type: "success" | "error";
  id: string;
};

export default function ToastBanner({
  message,
  top,
  type,
  id,
}: ToastBannerProps) {
  const { dismissBanner } = useBanner();

  const removeBanner = () => {
    return dismissBanner(id);
  };

  return (
    <div
      className={`${styles.toastBanner} ${type === "success" ? styles.success : styles.error}`}
      style={{ top }}
    >
      <div className={styles.iconCircle}>
        <FontAwesomeIcon icon={type === "success" ? faCheck : faXmark} />
      </div>
      <div className={styles.textBlock}>
        <p className={styles.heading}>
          {type === "success" ? "Success" : "Error"}
        </p>
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.dismissButton}
        onClick={removeBanner}
        aria-label="Dismiss notification"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
