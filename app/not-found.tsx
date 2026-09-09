import Link from "next/link";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import { notFoundLabels } from "@/data/labels";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <SingleColumn>
      <div className={styles.notFound}>
        <p className={styles.code}>404</p>
        <h2>{notFoundLabels.heading}</h2>
        <p className={styles.message}>{notFoundLabels.message}</p>
        <Link href="/" className={styles.homeLink}>
          {notFoundLabels.homeLink}
        </Link>
      </div>
    </SingleColumn>
  );
}
