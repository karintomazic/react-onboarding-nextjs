import styles from "./IconButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type IconButtonProps = {
  icon: IconDefinition;
  label: string;
  onclick?: () => void;
  isActive?: boolean;
};

export default function IconButton({
  icon,
  label,
  onclick,
  isActive,
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${isActive ? styles.active : ""}`}
      aria-label={label}
      onClick={onclick}
    >
      <FontAwesomeIcon icon={icon} />
      <span className={styles.tooltip}>{label}</span>
    </button>
  );
}
