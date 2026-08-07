"use client";

import MainMenuItem from "../../molecules/MainMenuItem/MainMenuItem";
import MenuLinkList from "../../molecules/MenuLinkList/MenuLinkList";
import styles from "./MainMenu.module.scss";
import {
  menuItems,
  mobileMenuItems,
  mobileMenuSmall,
} from "../../../data/menuItems";
import { useEffect, useState } from "react";

export default function MainMenu() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 992);

  useEffect(() => {
    const watchWidth = window.matchMedia("(max-width: 992px)");

    function handler(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    watchWidth.addEventListener("change", handler);
    return () => {
      watchWidth.removeEventListener("change", handler);
    };
  }, []);

  const items = isMobile ? mobileMenuItems : menuItems;

  return (
    <ul className={styles.mainMenuItem} aria-label="Main menu">
      {items.map((item) => (
        <MainMenuItem key={item.id} label={item.label} links={item.links} />
      ))}
      {isMobile && <MenuLinkList links={mobileMenuSmall} />}
    </ul>
  );
}
