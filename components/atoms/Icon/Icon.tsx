import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./Icon.module.scss";

export type IconProps = {
  icon: IconDefinition;
};

export default function Icon({ icon }: IconProps) {
  return (
    <FontAwesomeIcon icon={icon} aria-hidden="true" className={styles.icon} />
  );
}
