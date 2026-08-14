"use client";

import styles from "./DesktopNav.module.scss";
import MainMenu from "../MainMenu/MainMenu";
import LanguageSwitcherHandler from "../LanguageSwitcher/LanguageSwitcherHandler";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import { useState, useRef, type RefObject } from "react";
import { signOut } from "next-auth/react";

import logo from "../../../assets/logo.svg";
import plus from "../../../assets/plus.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { userMenuLabels } from "../../../data/labels";
import { useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import profileIcon from "../../../assets/profile.svg";
import Spinner from "@/components/atoms/Spinner/Spinner";

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
  const session = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(containerRef);

  const handleOpen = () => setOpen(true);

  const handleSignOut = async () => await signOut();

  console.log(session);

  const isLoggedIn = session.status === "authenticated";
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading";

  let loggedInContent;

  if (loggedInLoading) {
    loggedInContent = <Spinner variant="smallSpinner" />;
  } else if (isLoggedIn) {
    loggedInContent = (
      <div className={styles.loggedIn}>
        <Icon icon={faBell} />
        <div className={styles.userMenuWrapper} ref={containerRef}>
          <Image
            src={profileIcon}
            alt=""
            className={styles.profileIcon}
            width={32}
            height={32}
            onClick={handleOpen}
          />

          {open && !isClickedOutside && (
            <div className={styles.userDropdown}>
              <div className={styles.callout} />
              <p className={styles.userEmail}>{session.data?.user?.email}</p>
              <Button label="Log out" onClick={handleSignOut} />
            </div>
          )}
        </div>
      </div>
    );
  } else if (isNotLoggedIn) {
    loggedInContent = (
      <div className={styles.notLoggedIn}>
        <Link href="/login">{loginLinkLabel}</Link>
        <Link href="/register">{joinLinkLabel}</Link>
      </div>
    );
  }

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
        <div className={styles.joinDesktop}>{loggedInContent}</div>
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
