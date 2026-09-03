import { useBanner } from "@/hooks/useBanner";
import ToastBanner from "../ToastBanner/ToastBanner";

export default function BannerList() {
  const { banners } = useBanner();

  return (
    <>
      {/* Map has no .map() method like arrays
      Array.from(banners.values()) - pulls out the banner objects
      without the ids - and turn it into array so we can map */}
      {Array.from(banners.values()).map((banner, index) => {
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
