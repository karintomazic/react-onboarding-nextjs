import tmdbLogo from "../../../assets/logo.svg";
import styles from "./Footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={tmdbLogo} alt="The Movie Database" />
    </footer>
  );
}
