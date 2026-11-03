import { useRef, useState } from "react";
import styles from "./UserMenu.module.scss";
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Icon from "@/components/atoms/Icon/Icon";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { userMenuLabels } from "@/data/labels";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import profileIcon from "@/assets/profile.svg";

type UserMenuProps = {
  joinLabel: string;
  loginLabel: string;
};

export default function UserMenu({ joinLabel, loginLabel }: UserMenuProps) {
  const usermenuRef = useRef<HTMLDivElement>(null);

  const { status, data } = useSession();
  const [open, setOpen] = useState(false);
  const isHydrated = useIsHydrated();
  const isClickedOutside = useClickOutside(usermenuRef);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  let loggedInContent;

  const isOpen = open && !isClickedOutside;

  if (status === "loading" || !isHydrated) {
    loggedInContent = <Spinner variant="smallSpinner" />;
  } else if (status === "authenticated") {
    loggedInContent = (
      <div className={styles.loggedIn}>
        <Icon icon={faBell} />
        <div className={styles.userMenuWrapper} ref={usermenuRef}>
          <button type="button" onClick={handleOpen} aria-expanded={isOpen}>
            <Image
              src={profileIcon}
              alt={userMenuLabels.profileIconAlt}
              className={styles.profileIcon}
              width={32}
              height={32}
            />
          </button>
          {isOpen && (
            <div className={styles.userDropdown}>
              <div className={styles.callout} />
              <div className={styles.userInfo}>
                <p className={styles.userEmail}>{data.user?.email}</p>
                <div className={styles.profileLinks}>
                  <Link href="/profile">{userMenuLabels.viewProfile}</Link>
                  <Link href="/bookmarks">{userMenuLabels.myBookmarks}</Link>
                </div>
              </div>
              <div className={styles.divider} />
              <Button
                label={userMenuLabels.logOut}
                onClick={() => void handleSignOut()}
                className={styles.logoutLink}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    loggedInContent = (
      <div className={styles.notLoggedIn}>
        <Link href="/login">{loginLabel}</Link>
        <Link href="/register">{joinLabel}</Link>
      </div>
    );
  }

  return <div className={styles.userMenu}>{loggedInContent}</div>;
}
