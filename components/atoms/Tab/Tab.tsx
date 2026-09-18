import styles from "./Tab.module.scss";
import clsx from "clsx";

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      data-tab
      className={clsx(styles.selector, isActive && styles.active)}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}
