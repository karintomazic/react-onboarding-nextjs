import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import SearchFilterPanel from "@/components/molecules/SearchFilterPanel/SearchFilterPanel";
import FilterLinks from "@/components/molecules/FilterLinks/FilterLinks";
import { searchFilterPanelLabels } from "@/data/labels";
import { Suspense } from "react";

export default function SearchPageLayout({ children }: LayoutProps<"/search">) {
  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>
        <SearchFilterPanel heading={searchFilterPanelLabels.heading}>
          <Suspense fallback={null}>
            <FilterLinks />
          </Suspense>
        </SearchFilterPanel>
        {children}
      </div>
    </SingleColumn>
  );
}
