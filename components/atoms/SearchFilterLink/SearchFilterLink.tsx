import Link from "next/link";
import styles from "./SearchFilterLink.module.scss";
import clsx from "clsx";

type SearchFilterLinkProps = {
  linkLabel: string;
  count?: number;
  isActive: boolean;
  href: string;
};

export default function SearchFilterLink({
  linkLabel,
  count,
  isActive,
  href,
}: SearchFilterLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(styles.searchFilterLink, isActive && styles.active)}
    >
      {linkLabel}
      {count !== undefined && <span>{count}</span>}
    </Link>
  );
}
