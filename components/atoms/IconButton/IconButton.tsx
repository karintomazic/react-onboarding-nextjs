import styles from "./IconButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type IconButtonProps = { icon: IconDefinition; label: string };

export default function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button className={styles.iconButton} aria-label={label}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
