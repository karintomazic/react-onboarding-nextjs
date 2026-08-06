import styles from "./MenuLinkList.module.scss";
import MenuLink from "../../atoms/MenuLink/MenuLink";

export type MenuLinkListProps = {
  links: Array<{ label: string; url: string }>;
};

export default function MenuLinkList({ links }: MenuLinkListProps) {
  return (
    <ul className={styles.menu}>
      {links.map((link) => (
        <li key={link.label}>
          <MenuLink label={link.label} url={link.url}></MenuLink>
        </li>
      ))}
    </ul>
  );
}
