import styles from "./Spinner.module.scss";

export type SpinnerProps = {
  variant?: "defaultSpinner" | "smallSpinner";
};

export default function Spinner({ variant = "defaultSpinner" }: SpinnerProps) {
  return (
    <div className={`${styles.spinnerWrapper} ${styles[variant] ?? ""}`}>
      <div className={styles.spinner}></div>
    </div>
  );
}
