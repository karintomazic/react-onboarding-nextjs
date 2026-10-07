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
import { icons } from "@/assets/icons";
import { useIsHydrated } from "@/hooks/useIsHydrated";

type UserMenuProps = {
  joinLabel: string;
  loginLabel: string;
};

export default function UserMenu({ joinLabel, loginLabel }: UserMenuProps) {
  const usermenuRef = useRef<HTMLDivElement>(null);

  const session = useSession();
  const [open, setOpen] = useState(false);

  const isHydrated = useIsHydrated();

  const isClickedOutside = useClickOutside(usermenuRef);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  //  useSession().status states
  const isLoggedIn = session.status === "authenticated";
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading" || !isHydrated;

  let loggedInContent;

  if (loggedInLoading) {
    loggedInContent = <Spinner variant="smallSpinner" />;
  } else if (isLoggedIn) {
    loggedInContent = (
      <div className={styles.loggedIn}>
        <Icon icon={faBell} />
        <div className={styles.userMenuWrapper} ref={usermenuRef}>
          <Image
            src={icons.profileIcon}
            alt={userMenuLabels.profileIconAlt}
            className={styles.profileIcon}
            width={32}
            height={32}
            onClick={handleOpen}
          />

          {open && !isClickedOutside && (
            <div className={styles.userDropdown}>
              <div className={styles.callout} />
              <div className={styles.userInfo}>
                <p className={styles.userEmail}>{session.data.user?.email}</p>
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
  } else if (isNotLoggedIn) {
    loggedInContent = (
      <div className={styles.notLoggedIn}>
        <Link href="/login">{loginLabel}</Link>
        <Link href="/register">{joinLabel}</Link>
      </div>
    );
  }

  return <div className={styles.userMenu}>{loggedInContent}</div>;
}
