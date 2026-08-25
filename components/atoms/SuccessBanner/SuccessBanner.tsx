import styles from "./SuccessBanner.module.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SuccessBannerProps = {
  message: string;
  top: number;
};

export default function SuccessBanner({ message, top }: SuccessBannerProps) {
  return (
    <div className={styles.successBanner} style={{ top }}>
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
