// an array of active banners - with message and id
import { useState } from "react";
import { createContext } from "react";
import BannerList from "@/components/atoms/BannerList/BannerList";
import { v4 as uuidv4 } from "uuid";

type Banner = {
  id: string;
  message: string;
  type: "success" | "error";
};

type BannerContextValue = {
  banners: Map<string, Banner>;
  showBanner: (message: string, type: "success" | "error") => void;
  dismissBanner: (id: string) => void;
};

export const BannerContext = createContext<BannerContextValue | undefined>(
  undefined,
);

export function BannerProvider({ children }: { children: React.ReactNode }) {
  // use Map<id, Banner> instead of array - Banner[] - lets us delete one banner
  // by id directly instead of scanning the whole list with filter
  const [banners, setBanners] = useState<Map<string, Banner>>(new Map());

  const showBanner = (message: string, type: "success" | "error") => {
    const id = uuidv4();
    // setBanners((prev) => [...prev, { id, message, type }]);
    // copy existing Map as before so it re-renderes - then set new banner into the copy with its own id
    setBanners((prev) => new Map(prev).set(id, { id, message, type }));
    // first id = maps key to lookup for deleting it later, second id int he object is the banners id - same id

    setTimeout(() => {
      // find he banner that matches the id and remove it after 3s. keep the others as is
      // setBanners((prev) => prev.filter((b) => b.id !== id));
      setBanners((prev) => {
        const next = new Map(prev);
        // remove the banner by id
        next.delete(id);
        return next;
      });
    }, 5000);
  };

  const dismissBanner = (id: string) => {
    setBanners((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <BannerContext value={{ banners, showBanner, dismissBanner }}>
      {children}
      <BannerList />
    </BannerContext>
  );
}
