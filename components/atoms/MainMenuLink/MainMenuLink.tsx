import styles from "./MainMenuLink.module.scss";
import Link from "next/link";

export type MainMenuLinkProps = {
  label: string;
  url?: string;
  handleMenuToggle: () => void;
};

export default function MainMenuLink({
  label,
  url = "#",
  handleMenuToggle,
}: MainMenuLinkProps) {
  return (
    <Link
      onClick={handleMenuToggle}
      className={styles.link}
      href={url}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
