// an array of active banners - with message and id
import { useState } from "react";
import { createContext } from "react";
import BannerList from "@/components/atoms/BannerList/BannerList";

type Banner = {
  id: string;
  message: string;
};

type BannerContextValue = {
  banners: Banner[];
  showBanner: (message: string) => void;
};

export const BannerContext = createContext<BannerContextValue | undefined>(
  undefined,
);

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [banners, setBanners] = useState<Banner[]>([]);

  const showBanner = (message: string) => {
    const id = crypto.randomUUID();
    setBanners((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setBanners((prev) => prev.filter((b) => b.id !== id)); // find he banner that matches the id and remove it after 3s. keep the others as is
    }, 3000);
  };

  return (
    <BannerContext value={{ banners, showBanner }}>
      {children}
      <BannerList />
    </BannerContext>
  );
}
