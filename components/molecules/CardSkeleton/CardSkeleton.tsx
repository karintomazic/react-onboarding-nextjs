import styles from "./CardSkeleton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

type CardSkeletonProps = {
  loadingLabel: string;
  variant: "showcase" | "popular";
};

export default function CardSkeleton({
  loadingLabel,
  variant,
}: CardSkeletonProps) {
  return (
    <div className={`${styles.cardSkeleton ?? ""} ${styles[variant] ?? ""}`}>
      <div className={styles.placeholder}>
        <FontAwesomeIcon icon={faImage} />
      </div>
      <div className={styles.loadingWrapper}>
        <h3>{loadingLabel}</h3>
      </div>
    </div>
  );
}
