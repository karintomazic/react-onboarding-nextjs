"use client";

import styles from "./MainMenuItem.module.scss";
import MainMenuLink from "../../atoms/MainMenuLink/MainMenuLink";
import MenuLinkList from "../MenuLinkList/MenuLinkList";
import { useState } from "react";

export type MainMenuItemProps = {
  label: string;
  links: Array<{ label: string; url: string }>;
};

export default function MainMenuItem({ label, links }: MainMenuItemProps) {
  const [open, setOpen] = useState(false);
  const toggleMenuOpen = () => {
    if (window.innerWidth < 992) {
      setOpen(!open);
    }
  };

  return (
    <li
      className={` ${styles.mainMenu ?? ""} ${(open ? styles.open : "") ?? ""}`}
      // aria-expanded={open} - check where to put it
    >
      <MainMenuLink label={label} handleMenuToggle={toggleMenuOpen} />
      <div className={styles.mainMenuList}>
        <MenuLinkList links={links}></MenuLinkList>
      </div>
    </li>
  );
}
