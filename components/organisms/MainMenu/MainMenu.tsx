"use client";

import MainMenuItem from "../../molecules/MainMenuItem/MainMenuItem";
import MenuLinkList from "../../molecules/MenuLinkList/MenuLinkList";
import styles from "./MainMenu.module.scss";
import {
  menuItems,
  mobileMenuItems,
  mobileMenuSmall,
} from "../../../data/menuItems";
// imports the hook that lets a component read a value that lives
// outside React and stays in sync with it
// here for exmple the browsers viewport width
import { useSyncExternalStore } from "react";

// defines how to liste for changes
// react will call this function once and give it a callback
// - no arguments - something changed, go re-check the value.
function subscribe(callback: () => void) {
  window.addEventListener("resize", callback); // wires callback to a real browser event, when a window resizes browser calls the callback
  // and tells it the valu ehas changed - check it

  // clean up function - called when unmounts - prevents memory leak
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.innerWidth < 992; // the current value
}

function getServerSnapshot() {
  // value used when the components is rendered on the server
  // (no browser and window - no viewport to check server-side)
  return false; // fixes window is not defined
}

export default function MainMenu() {
  const isMobile = useSyncExternalStore(
    subscribe, // react calls this to start listening once - and everytime callback fires on
    // resize - react calls getSnapshot again and compared = if different - re-render
    getSnapshot, // react calls this for initial value for the first time
    getServerSnapshot, // gets called once on the server - false
  );

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
