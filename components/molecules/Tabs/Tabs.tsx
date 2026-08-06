"use client";

import styles from "./Tabs.module.scss";
import Tab from "../../atoms/Tab/Tab";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { KeyboardEvent, MouseEvent } from "react";
import type { RefObject } from "react";

type TabsProps = {
  tabs: Array<{ id: number; label: string }>;
  activeTab: number;
  onTabChange: (id: number) => void;
  mobileListAriaLabel: string;
  ref: RefObject<HTMLDivElement | null>;
};

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  ref,
  mobileListAriaLabel,
}: TabsProps) {
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const tabElements = ref.current.querySelectorAll("[data-tab]");
    const activeElement = tabElements[activeIndex] as HTMLElement;

    setSliderStyle({
      left: activeElement.offsetLeft,
      width: activeElement.offsetWidth,
    });
  }, [activeTab, tabs, ref]);

  const handleOnKeyDown = (e: KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      onTabChange(id);
      setIsOpen(false);
    }
  };

  const handleClick = (id: number) => {
    onTabChange(id);
    setIsOpen(false);
  };

  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.mobileDropdown}>
        {isOpen && (
          <ul
            className={styles.mobileDropdownList}
            role="listbox"
            aria-label={mobileListAriaLabel}
          >
            {tabs.map((tab) => (
              <li
                key={tab.id}
                role="option"
                tabIndex={0}
                className={tab.id === activeTab ? styles.activeOption : ""}
                aria-selected={tab.id === activeTab}
                onKeyDown={(e) => {
                  handleOnKeyDown(e, tab.id);
                }}
                onClick={() => {
                  handleClick(tab.id);
                }}
              >
                {tab.id === activeTab ? (
                  <div className={styles.activeBtnWrapper}>
                    <button type="button" onClick={handleOpen}>
                      {tab.label}
                      <span className={styles.iconDown}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </button>
                  </div>
                ) : (
                  tab.label
                )}
              </li>
            ))}
          </ul>
        )}

        {!isOpen && (
          <div className={styles.activeBtnWrapper}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
              }}
              aria-haspopup="listbox"
            >
              {tabs.find((tab) => tab.id === activeTab)?.label}
              <span className={styles.iconDown}>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.selectorWrap} ref={ref}>
        <div
          className={styles.slider}
          style={{ left: sliderStyle.left, width: sliderStyle.width }}
        ></div>
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.id}
              label={tab.label}
              isActive={tab.id === activeTab}
              onClick={() => {
                onTabChange(tab.id);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
