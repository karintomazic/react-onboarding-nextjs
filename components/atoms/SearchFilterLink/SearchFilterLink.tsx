// import { NavLink } from "react-router"; - add active link here
import Link from "next/link";
import styles from "./SearchFilterLink.module.scss";
import clsx from "clsx";

type SearchFilterLinkProps = {
  linkName: string;
  linkLabel: string;
  count: number;
  searchParams: string;
  isActive: boolean;
};

export default function SearchFilterLink({
  linkName,
  linkLabel,
  count,
  searchParams,
  isActive,
}: SearchFilterLinkProps) {
  return (
    <li className={clsx(styles.searchFilterLink, isActive && styles.active)}>
      <Link
        href={{
          pathname: linkName,
          search: searchParams,
        }}
      >
        {linkLabel}
        <span>{count}</span>
      </Link>
    </li>
  );
}
