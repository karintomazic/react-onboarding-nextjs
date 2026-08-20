"use client";

import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { formatDate } from "../../../utils/formatDate";
import { useRef, useState, useLayoutEffect } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import OptionsDropdown from "@/components/atoms/OptionsDropdown/OptionsDropdown";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { toggleBookmark } from "@/utils/toggleBookmark";

import { createPortal } from "react-dom";

type CardProps = {
  id: string;
  image?: StaticImageData | string;
  title: string;
  date?: string;
  variant: "showcase" | "popular";
};

export default function Card({ image, title, date, variant, id }: CardProps) {
  const movieUrl = `/movie/${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(cardRef, dropdownRef);
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const handleOptionsToggle = () => {
    setOptionsOpen(!optionsOpen);
  };

  const { data } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
  });

  const bookmarkMovieIds = data?.map((m) => {
    return m.movieId;
  });

  useLayoutEffect(() => {
    if (!optionsOpen) return;

    const optionsPosition = optionsRef.current?.getBoundingClientRect();
    if (!optionsPosition) return;

    const margin = 8;
    const left = Math.min(
      Math.max(optionsPosition.right - 270, margin),
      window.innerWidth - 270 - margin,
    );

    // getting the icons real DOM position after its on the page,
    // not deriving state from state

    setDropdownPosition({
      top: optionsPosition.bottom + 8,
      left: left,
    });

    const closeScroll = () => {
      setOptionsOpen(false);
    };

    document.addEventListener("scroll", closeScroll, true);

    return () => {
      document.removeEventListener("scroll", closeScroll, true);
    };
  }, [optionsOpen]);

  const isBookmarked = bookmarkMovieIds?.includes(Number(id)) ?? false;

  const handleAddToBookmark = async () => {
    try {
      await toggleBookmark(isBookmarked, Number(id));
      setError("");
      queryClient.invalidateQueries({ queryKey: ["bookmarks-page"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
      <div
        className={image ? styles.posterImage : styles.placeholder}
        ref={cardRef}
      >
        <Link href={movieUrl}>
          {image ? (
            <Image src={image} alt="placeholder image" fill sizes="200px" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
        <div className={styles.options} ref={optionsRef}>
          <button
            onClick={handleOptionsToggle}
            aria-label={"Options toggle"}
            className={styles.optionsToggle}
          ></button>
          {optionsOpen &&
            !isClickedOutside &&
            createPortal(
              <OptionsDropdown
                dropdownPosition={dropdownPosition}
                dropdownRef={dropdownRef}
                handleAddToBookmark={handleAddToBookmark}
                isBookmarked={isBookmarked}
              />,
              document.body,
            )}
        </div>
      </div>
      <div className={styles.cardText}>
        <h3>
          <Link href={movieUrl}>{title}</Link>
        </h3>
        {date && (
          <time className={styles.date} dateTime={date}>
            {formatDate(date)}
          </time>
        )}
      </div>
    </div>
  );
}
