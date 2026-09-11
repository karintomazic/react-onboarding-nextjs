import tmdbLogo from "../../../assets/logo.svg";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { footerLabels } from "@/data/labels";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={tmdbLogo} alt={footerLabels.logoAlt} />
    </footer>
  );
}
