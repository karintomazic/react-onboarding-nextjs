import styles from "./Spinner.module.scss";
import clsx from "clsx";

export type SpinnerProps = {
  variant?: "defaultSpinner" | "smallSpinner";
};

export default function Spinner({ variant = "defaultSpinner" }: SpinnerProps) {
  return (
    <div className={clsx(styles.spinnerWrapper, styles[variant])}>
      <div className={styles.spinner}></div>
    </div>
  );
}
