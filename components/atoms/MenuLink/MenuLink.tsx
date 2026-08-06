import styles from "./MenuLink.module.scss";
import Link from "next/link";

export type MenuLinkProps = {
  label: string;
  url: string;
};

export default function MenuLink({ label, url }: MenuLinkProps) {
  return (
    <Link className={styles.link} href={url}>
      {label}
    </Link>
  );
}
