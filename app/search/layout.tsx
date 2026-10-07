import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";

export default function SearchPageLayout({ children }: LayoutProps<"/search">) {
  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>{children}</div>
    </SingleColumn>
  );
}
