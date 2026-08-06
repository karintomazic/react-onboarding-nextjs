"use client";

import { useRef, useState } from "react";
import styles from "./UserMenu.module.scss";
import profileIcon from "../../../assets/profile.svg";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Image from "next/image";

type UserMenuProps = {
  ariaLabel: string;
  loginLabel: string;
  joinLabel: string;
};

export default function UserMenu({
  ariaLabel,
  loginLabel,
  joinLabel,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const usermenuRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(usermenuRef);

  const openUserMenu = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.userMenu} ref={usermenuRef}>
      <button
        onClick={openUserMenu}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <Image src={profileIcon} alt="" />
      </button>
      {isOpen && !isClickedOutside && (
        <div className={styles.dropdown}>
          <a>{loginLabel}</a>
          <a>{joinLabel}</a>
        </div>
      )}
    </div>
  );
}
