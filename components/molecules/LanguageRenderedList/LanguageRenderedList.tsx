import styles from "./LanguageRenderedList.module.scss";
import clsx from "clsx";

type LanguageRenderedListProps = {
  languageList: Array<{ code: string; label: string }>;
  filter: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  type: "primary" | "fallback";
  setIsOpen: (arg: boolean) => void;
  highlighted: string | null;
  selected: string;
};

export default function LanguageRenderedList({
  languageList,
  filter,
  onSelect,
  type,
  setIsOpen,
  highlighted,
  selected,
}: LanguageRenderedListProps) {
  const list = languageList
    .filter((list) => list.label.toLowerCase().includes(filter.toLowerCase()))
    .map((list) => {
      return (
        <li
          key={list.code}
          onMouseDown={(e) => {
            e.stopPropagation();
            onSelect(list.code, type);
            setIsOpen(false);
          }}
          className={clsx(
            styles.languageList,
            list.code === (highlighted ?? selected) && styles.active,
          )}
          role="option"
          tabIndex={0}
          aria-selected={list.code === (highlighted ?? selected)}
        >
          {list.label} ({list.code})
        </li>
      );
    });

  return list;
}
