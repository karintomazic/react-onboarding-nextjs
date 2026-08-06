"use client";

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

      let listItems: HTMLLIElement[]; // will be array

      if (listRef.current !== null) {
        const lanList = listRef.current.querySelectorAll("li"); // search gor lis inside listRef ul
        listItems = Array.from(lanList); // convert lanList into array
      } else {
        listItems = [];
      }

      const i = listItems.indexOf(document.activeElement as HTMLLIElement); // the position of selected element inside listItems array

      if (e.key === "ArrowDown") {
        const next = i + 1 < listItems.length ? i + 1 : 0; // check if the next item is smaller than the listItems array - if its grather move to the first index - to the start of the list

        if (!filtered[next]) return; // if there is no next

        const target = listItems[next] as HTMLElement;
        target.focus({ preventScroll: true }); // focus on the next one when going dow/up with the arrow
        target.scrollIntoView({ block: "nearest" });

        setHighlighted(filtered[next].code);
      } else {
        // ArrowUp
        if (i <= 0) {
          // if you are at the first item or the input and you go up
          if (inputRef.current !== null) {
            inputRef.current.focus(); // move focus to the input
          }
          setHighlighted(null); // remove hilight (so the hilihted is currently selected)
        } else {
          const target = listItems[i - 1] as HTMLElement;
          target.focus({ preventScroll: true }); // focus on one step above the current
          target.scrollIntoView({ block: "nearest" });

          const itemAbove = filtered[i - 1]; // item you are moving up to

          if (itemAbove !== undefined) {
            setHighlighted(itemAbove.code);
          } else {
            setHighlighted(null);
          }
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
