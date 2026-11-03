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
import { createPortal } from "react-dom";
import { buildMovieUrl } from "@/utils/buildMovieUrl";
import { useToggleBookmark } from "@/hooks/useToggleBookmarks";
import { cardLabels } from "@/data/labels";
import clsx from "clsx";

type CardProps = {
  id: number;
  image?: StaticImageData | string;
  title: string;
  date?: string;
  variant: "showcase" | "popular";
  optionsPromptLabel: string;
  loginLabel: string;
  notAMemberLabel: string;
  signUpLabel: string;
};

export default function Card({
  image,
  title,
  date,
  variant,
  id,
  optionsPromptLabel,
  loginLabel,
  notAMemberLabel,
  signUpLabel,
}: CardProps) {
  const movieUrl = buildMovieUrl({ id, title });

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(cardRef, dropdownRef);

  const { isBookmarked, handleAddToBookmark } = useToggleBookmark({
    movieId: id,
  });

  const handleOptionsToggle = () => {
    setOptionsOpen(!optionsOpen);
  };

  useLayoutEffect(() => {
    if (!optionsOpen) return;

    const optionsPosition = optionsRef.current?.getBoundingClientRect();
    if (!optionsPosition) return;

    const dropdownWidth =
      dropdownRef.current?.getBoundingClientRect().width ?? 270;

    const margin = 8;
    const left = Math.min(
      Math.max(optionsPosition.right - dropdownWidth, margin),
      window.innerWidth - dropdownWidth - margin,
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

  return (
    <div className={clsx(styles.showcaseCard, styles[variant])}>
      <div
        className={image ? styles.posterImage : styles.placeholder}
        ref={cardRef}
      >
        <Link href={movieUrl} aria-label={title}>
          {image ? (
            <Image
              src={image}
              alt={cardLabels.placeholderImageAlt}
              fill
              sizes="200px"
            />
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
                handleAddToBookmark={() => void handleAddToBookmark()}
                isBookmarked={isBookmarked}
                optionsPromptLabel={optionsPromptLabel}
                loginLabel={loginLabel}
                notAMemberLabel={notAMemberLabel}
                signUpLabel={signUpLabel}
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
