import { useState, useRef, useEffect } from "react";
import styles from "./LanguageSelect.module.scss";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import type { ChangeEvent, KeyboardEvent } from "react";
import LanguageRenderedList from "../LanguageRenderedList/LanguageRenderedList";
import { useClickOutside } from "../../../hooks/useClickOutside";

export type LanguageSelectProps = {
  languageList: Array<{ code: string; label: string }>;
  selected: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  type: "primary" | "fallback";
  filterPlaceholder: string;
  filterAriaLabel: string;
  listAriaLabel: string;
};

export default function LanguageSelect({
  languageList,
  selected,
  onSelect,
  type,
  filterPlaceholder,
  filterAriaLabel,
  listAriaLabel,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlighted, setHighlighted] = useState<string | null>(null);

  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // boolean value
  const isClickedOutside = useClickOutside(containerRef);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
    if (isOpen && listRef.current !== null) {
      listRef.current
        .querySelector(`[aria-selected="true"]`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen]);

  const handleOpen = () => {
    const isCurrentlyOpen = isOpen && !isClickedOutside;
    if (isCurrentlyOpen) {
      setHighlighted(null);
    }

    setIsOpen(!isCurrentlyOpen);
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlighted(null);
    } else if (e.key === "Enter" && highlighted) {
      onSelect(highlighted, type);
      setIsOpen(false);
      setHighlighted(null);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const filtered = languageList.filter((item) =>
        item.label.toLowerCase().includes(filter.toLowerCase()),
      );

      if (filtered.length === 0) return; // nothing to navigate to

      let listItems: HTMLLIElement[];

      if (listRef.current !== null) {
        const lanList = listRef.current.querySelectorAll("li");
        listItems = Array.from(lanList);
      } else {
        listItems = [];
      }

      // derive position from filtered and highlighted
      const currentIndex = filtered.findIndex(
        (item) => item.code === highlighted,
      );

      if (e.key === "ArrowDown") {
        const next = currentIndex + 1 < filtered.length ? currentIndex + 1 : 0; // check if the next item is smaller than the listItems array - if its grather move to the first index - to the start of the list

        listItems[next]?.focus({ preventScroll: true });
        listItems[next]?.scrollIntoView({ block: "nearest" });

        setHighlighted(filtered[next].code);
      } else {
        // ArrowUp
        if (currentIndex <= 0) {
          // nothing highlighted, or already at the first item - move back to the input
          inputRef.current?.focus();
          setHighlighted(null); // remove hilight (so the hilihted is currently selected)
        } else {
          const prev = currentIndex - 1;

          listItems[prev]?.focus({ preventScroll: true });
          listItems[prev]?.scrollIntoView({ block: "nearest" });

          setHighlighted(filtered[prev].code);
        }
      }
    }
  };

  let activeCode;
  if (highlighted !== null && !isClickedOutside) {
    // if highlighted/selected with arrow up/down
    activeCode = highlighted;
  } else {
    activeCode = selected; // fallback to already selected one
  }

  const foundLanguage = languageList.find(
    (language) => language.code === activeCode,
  ); // active lang object

  let activeLabel;
  if (foundLanguage !== undefined) {
    activeLabel = foundLanguage.label; // display label
  } else {
    activeLabel = activeCode; // if no label just show the code
  }

  return (
    <div
      className={styles.selectWrapper}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={handleOpen}
        className={styles.languageBtn}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {activeLabel} ({activeCode})
        <Icon icon={faCaretDown} />
      </button>

      {isOpen && !isClickedOutside && (
        <div className={styles.selectBox}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarInner}>
              <Icon icon={faMagnifyingGlass} />
              <Input
                value={filter}
                onChange={handleFilter}
                placeholder={filterPlaceholder}
                ariaLabel={filterAriaLabel}
                ref={inputRef}
              />
            </div>
          </div>

          <ul role="listbox" ref={listRef} aria-label={listAriaLabel}>
            <LanguageRenderedList
              languageList={languageList}
              filter={filter}
              onSelect={onSelect}
              type={type}
              setIsOpen={setIsOpen}
              highlighted={highlighted}
              selected={selected}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
