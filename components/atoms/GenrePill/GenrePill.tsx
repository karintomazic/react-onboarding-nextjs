"use client"

import styles from "./GenrePill.module.scss";

type Genre = { id: number; name: string };

type GenrePillProps = {
  genre: Genre;
  isSelected: boolean;
  onToggle: () => void;
};

export default function GenrePill({
  genre,
  isSelected,
  onToggle,
}: GenrePillProps) {
  return (
    <li
      key={genre.id}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => {
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`${(isSelected ? styles.active : "") ?? ""} ${styles.pill ?? ""}`}
    >
      {genre.name}
    </li>
  );
}
