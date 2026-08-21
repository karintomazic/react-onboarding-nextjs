import styles from "./SuccessBanner.module.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SuccessBannerProps = {
  message: string;
};

export default function SuccessBanner({ message }: SuccessBannerProps) {
  return (
    <div className={styles.successBanner}>
      <div className={styles.iconCircle}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div className={styles.textBlock}>
        <p className={styles.heading}>Success</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
