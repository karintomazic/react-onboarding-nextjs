"use client";

import styles from "./FilterPanel.module.scss";
import Icon from "../../atoms/Icon/Icon";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";

type PannelProps = {
  title: string;
  subtitle: string;
  toggleAction: () => void;
  toggle: boolean;
  children: ReactNode;
};

export default function FilterPanel({
  title,
  subtitle,
  toggleAction,
  toggle,
  children,
}: PannelProps) {
  return (
    <div className={styles.filterPanel}>
      <button
        className={styles.name}
        onClick={toggleAction}
        aria-expanded={toggle}
      >
        <h3>{title}</h3>

        {toggle ? (
          <span className={styles.chevron}>
            <Icon icon={faChevronDown} />
          </span>
        ) : (
          <span className={styles.chevron}>
            <Icon icon={faChevronRight} />
          </span>
        )}
      </button>

      {toggle && (
        <div className={styles.filter}>
          <h4>{subtitle}</h4>
          {children}
        </div>
      )}
    </div>
  );
}
