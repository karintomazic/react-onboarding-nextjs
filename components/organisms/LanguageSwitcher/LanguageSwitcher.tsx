"use client";

import styles from "./LanguageSwitcher.module.scss";
import { useState, useRef } from "react";
import LanguageSelect from "../../molecules/LanguageSelect/LanguageSelect";
import Button from "../../atoms/Button/Button";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { languageSelectLabels } from "../../../data/labels";
import type { KeyboardEvent } from "react";

export type LanguageSwitcherProps = {
  languageList: Array<{ code: string; label: string }>;
  selectedMain: string;
  selectedFallback: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  onReset: () => void;
  ariaLabel: string;
  legend: string;
  defaultLanguageLabel: string;
  fallbackLanguageLabel: string;
  resetLabel: string;
};

export default function LanguageSwitcher({
  languageList,
  selectedMain,
  selectedFallback,
  onSelect,
  onReset,
  ariaLabel,
  legend,
  defaultLanguageLabel,
  fallbackLanguageLabel,
  resetLabel,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // boolean value
  const isClickedOutside = useClickOutside(ref);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <section
      className={styles.languageSwitcher}
      ref={ref}
      onKeyDown={handleKeyDown}
    >
      <Button
        variant="language"
        label={selectedMain.split("-").pop() ?? ""}
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      />
      {isOpen && !isClickedOutside && (
        <div className={styles.languageDropdown}>
          <div className={styles.callout} />
          <form>
            <fieldset>
              <legend>{legend}</legend>
              <div className={styles.defaultLanguage}>
                <div className={styles.defaultLanguageHeader}>
                  <p>{defaultLanguageLabel}</p>
                  <Button
                    label={resetLabel}
                    variant="reset"
                    onClick={onReset}
                  />
                </div>
                <LanguageSelect
                  languageList={languageList}
                  selected={selectedMain}
                  type="primary"
                  onSelect={onSelect}
                  filterPlaceholder={languageSelectLabels.filterPlaceholder}
                  filterAriaLabel={languageSelectLabels.filterAriaLabel}
                  listAriaLabel={languageSelectLabels.listAriaLabel}
                />
              </div>
              <div>
                <p>{fallbackLanguageLabel}</p>
                <LanguageSelect
                  languageList={languageList}
                  selected={selectedFallback}
                  type="fallback"
                  onSelect={onSelect}
                  filterPlaceholder={languageSelectLabels.filterPlaceholder}
                  filterAriaLabel={languageSelectLabels.filterAriaLabel}
                  listAriaLabel={languageSelectLabels.listAriaLabel}
                />
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
}
