import styles from "./Footer.module.scss";
import Image from "next/image";
import { footerLabels } from "@/data/labels";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={logo} alt={footerLabels.logoAlt} />
    </footer>
  );
}
