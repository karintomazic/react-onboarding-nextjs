// import { NavLink } from "react-router"; - add active link here
import Link from "next/link";
import styles from "./SearchFilterLink.module.scss";

type searchFilterLinkProps = {
  linkName: string;
  linkLabel: string;
  count: number;
  searchParams: string;
};

export default function SearchFilterLink({
  linkName,
  linkLabel,
  count,
  searchParams,
}: searchFilterLinkProps) {
  return (
    <li className={styles.searchFilterLink}>
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
