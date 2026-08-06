"use client";

import styles from "./Pagination.module.scss";
import {
  faChevronLeft,
  faChevronRight,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PaginationData = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationData) {
  // const [searchParams] = useSearchParams(); - different shape, we dont get a setter here
  const searchParams = useSearchParams();
  console.log(searchParams);

  function pageHref(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", targetPage.toString());
    return `?${params.toString()}`;
  }

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
  ) {
    return isEnabled ? (
      <Link href={pageHref(targetPage)}>
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
  );
  const nextLink = prevNextLink(
    currentPage < totalPages,
    currentPage + 1,
    faChevronRight,
  );

  const onlyOnePage = pageNumbers.length <= 1;

  return (
    <>
      {!onlyOnePage && (
        <nav className={styles.pageNumbers}>
          {prevLink}
          {pageNumbers.map((pageNum) => (
            <Link
              key={pageNum}
              href={pageHref(pageNum)}
              data-active={currentPage == pageNum}
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
