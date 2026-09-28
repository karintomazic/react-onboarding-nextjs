import Link from "next/link";
import styles from "./SearchFilterLink.module.scss";
import clsx from "clsx";

type SearchFilterLinkProps = {
  linkLabel: string;
  count: number;
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
    <li className={clsx(styles.searchFilterLink, isActive && styles.active)}>
      <Link href={href}>
        {linkLabel}
        <span>{count}</span>
      </Link>
    </li>
  );
}
