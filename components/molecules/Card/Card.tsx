"use client";

import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { formatDate } from "../../../utils/formatDate";
import { useRef, useState, useLayoutEffect } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

import { createPortal } from "react-dom";

type CardProps = {
  id: string;
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
  const movieUrl = `/movie/${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(cardRef, dropdownRef);

  const handleOptionsToggle = () => {
    setOptionsOpen(!optionsOpen);
  };

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

  return (
    <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
      <div
        className={image ? styles.posterImage : styles.placeholder}
        ref={cardRef}
      >
        <Link href={movieUrl}>
          {image ? (
            <Image src={image} alt="placeholder image" />
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
              <div
                className={styles.optionsDropdown}
                ref={dropdownRef}
                style={{
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                }}
              >
                <div className={styles.optionsBlock}>
                  <p className={styles.optionsPrompt}>{optionsPromptLabel}</p>
                  <p className={styles.optionsAction}>
                    <a>
                      {loginLabel} <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                  </p>
                </div>
                <div className={styles.optionsBlock}>
                  <p className={styles.optionsPrompt}>{notAMemberLabel}</p>
                  <p className={styles.optionsAction ?? ""}>
                    <a>
                      {signUpLabel} <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                  </p>
                </div>
              </div>,
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
