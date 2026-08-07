import { type ReactNode } from "react";
import styles from "./SingleColumn.module.scss";

type SingleColumnProps = {
  children?: ReactNode;
};

export default function SingleColumn({ children }: SingleColumnProps) {
  return (
    <div className={styles.singleColumnWrapper}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
