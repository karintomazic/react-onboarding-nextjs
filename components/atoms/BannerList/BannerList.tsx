import { useBanner } from "@/hooks/useBanner";
import ToastBanner from "../ToastBanner/ToastBanner";

export default function BannerList() {
  const { banners } = useBanner();

  return (
    <>
      {[...banners.values()].map((banner, index) => {
        return (
          <ToastBanner
            key={banner.id}
            id={banner.id}
            message={banner.message}
            type={banner.type}
            top={20 + index * 100}
          />
        );
      })}
    </>
  );
}
