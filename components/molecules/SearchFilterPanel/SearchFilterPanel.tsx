import styles from "./SearchFilterPanel.module.scss";
import type { ReactNode } from "react";

type searchFilterPanelProps = {
  children: ReactNode;
  heading: string;
};

export default function SearchFilterPanel({
  children,
  heading,
}: searchFilterPanelProps) {
  return (
    <div className={styles.searchFilters}>
      <div className={styles.searchHeader}>
        <h3>{heading}</h3>
      </div>
      <div>
        <ul>{children}</ul>
      </div>
    </div>
  );
}
