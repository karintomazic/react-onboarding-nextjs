import { type ReactNode } from "react";
import styles from "./TwoColumn.module.scss";

type TwoColumnProps = {
  main: ReactNode;
  sidebar: ReactNode;
};

export default function TwoColumn({ main, sidebar }: TwoColumnProps) {
  return (
    <div className={styles.twoColumnWrapper}>
      <div className={styles.content}>
        <main>{main}</main>
        <aside>{sidebar}</aside>
      </div>
    </div>
  );
}
