import styles from "./Footer.module.scss";
import Image from "next/image";
import { footerLabels } from "@/data/labels";
import { icons } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={icons.logo} alt={footerLabels.logoAlt} />
    </footer>
  );
}
