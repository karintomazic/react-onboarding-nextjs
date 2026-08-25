"use client";

import { useBanner } from "@/hooks/useBanner";
import SuccessBanner from "../SuccessBanner/SuccessBanner";

export default function BannerList() {
  const { banners } = useBanner();
  console.log(banners);

  return (
    <>
      {banners.map((banner, index) => {
        return (
          <SuccessBanner
            key={banner.id}
            message={banner.message}
            top={20 + index * 100}
          ></SuccessBanner>
        );
      })}
    </>
  );
}
