"use client";

import styles from "./MobileNav.module.scss";
import MainMenu from "../MainMenu/MainMenu";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import Link from "next/link";
import Image from "next/image";
import mobileLogo from "../../../assets/mobile-logo.svg";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { userMenuLabels } from "../../../data/labels";
import { usePathname } from "next/navigation";

type MobileNavProps = {
  homeAriaLabel: string;
  openMenuAriaLabel: string;
};

export default function MobileNav({
  homeAriaLabel,
  openMenuAriaLabel,
}: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = usePathname();

  const [prevPath, setPrevPath] = useState(location);

  if (location !== prevPath) {
    setPrevPath(location);
    setMenuOpen(false);
  }

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={styles.mobileNavbar}>
        <button
          className={styles.burgerBtn}
          aria-label={openMenuAriaLabel}
          onClick={toggleOpen}
        >
          <Icon icon={faBars} />
        </button>
        <Link href="/" className={styles.mobileLogo} aria-label={homeAriaLabel}>
          <Image src={mobileLogo} alt="" />
        </Link>
        <div className={styles.mobileRight}>
          <UserMenu
            loginLabel={userMenuLabels.login}
            joinLabel={userMenuLabels.join}
          />

          <div className={styles.searchIcon}>
            <Icon icon={faMagnifyingGlass} />
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => {
            setMenuOpen(false);
          }}
        />
      )}
      <div
        className={`${styles.drawer ?? ""} ${(menuOpen ? styles.drawerOpen : "") ?? ""}`}
      >
        <MainMenu />
      </div>
    </>
  );
}
