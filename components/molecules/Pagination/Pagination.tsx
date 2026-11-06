import styles from "./Pagination.module.scss";
import {
  faChevronLeft,
  faChevronRight,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { paginationLabels } from "@/data/labels";

type PaginationData = {
  page: number;
  totalPages: number;
  pageHref: (targetPage: number) => string;
};

export default function Pagination({
  page,
  totalPages,
  pageHref,
}: PaginationData) {
  // calculate start page
  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  // calculate which 5 pages are showing
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }).map(
    (e, i) => startPage + i,
  );

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  function prevNextLink(
    isEnabled: boolean,
    targetPage: number,
    icon: IconDefinition,
    label: string,
  ) {
    return isEnabled ? (
      <Link href={pageHref(targetPage)} aria-label={label}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    ) : (
      <span aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  }

  const prevLink = prevNextLink(
    currentPage > 1,
    currentPage - 1,
    faChevronLeft,
    paginationLabels.previous,
  );
  const nextLink = prevNextLink(
    currentPage < totalPages,
    currentPage + 1,
    faChevronRight,
    paginationLabels.next,
  );

  const onlyOnePage = pageNumbers.length <= 1;

  return (
    <>
      {!onlyOnePage && (
        <nav
          className={styles.pageNumbers}
          aria-label={paginationLabels.pagination}
        >
          {prevLink}
          {pageNumbers.map((pageNum) => (
            <Link
              key={pageNum}
              href={pageHref(pageNum)}
              aria-current={currentPage === pageNum ? "page" : undefined}
              aria-label={`${paginationLabels.page} ${String(pageNum)}`}
            >
              {pageNum}
            </Link>
          ))}
          {nextLink}
        </nav>
      )}
    </>
  );
}
