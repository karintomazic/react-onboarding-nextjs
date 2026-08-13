"use client";

import styles from "./DesktopNav.module.scss";
import MainMenu from "../MainMenu/MainMenu";
import LanguageSwitcherHandler from "../LanguageSwitcher/LanguageSwitcherHandler";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import Link from "next/link";
import Image from "next/image";
import type { RefObject } from "react";

import logo from "../../../assets/logo.svg";
import plus from "../../../assets/plus.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { userMenuLabels } from "../../../data/labels";

type DesktopNavProps = {
  homeAriaLabel: string;
  createAriaLabel: string;
  loginLinkLabel: string;
  joinLinkLabel: string;
  handleLoopClick: () => void;
  loopRef: RefObject<HTMLDivElement | null>;
};

export default function DesktopNav({
  homeAriaLabel,
  createAriaLabel,
  loginLinkLabel,
  joinLinkLabel,
  handleLoopClick,
  loopRef,
}: DesktopNavProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} aria-label={homeAriaLabel}>
          <Image src={logo} alt="" />
        </Link>
        <MainMenu />
      </div>
      <div className={styles.right}>
        <a aria-label={createAriaLabel} className={styles.plus}>
          <Image src={plus} alt="" />
        </a>
        <LanguageSwitcherHandler />
        <div className={styles.joinDesktop}>
          <Link href="/login">{loginLinkLabel}</Link>
          <Link href="/register">{joinLinkLabel}</Link>
        </div>
        <div className={styles.joinMobile}>
          <UserMenu
            ariaLabel={userMenuLabels.ariaLabel}
            loginLabel={userMenuLabels.login}
            joinLabel={userMenuLabels.join}
          />
        </div>
        <div
          className={styles.searchIcon}
          onClick={handleLoopClick}
          ref={loopRef}
        >
          <Icon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
}
