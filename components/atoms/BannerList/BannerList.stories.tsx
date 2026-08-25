import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BannerListComponent from "./BannerList";
import { BannerProvider } from "@/context/BannerContext";
import { useBanner } from "@/hooks/useBanner";
import { useRef, useEffect } from "react";

function TriggerBanners() {
  const { showBanner } = useBanner();
  const hasRun = useRef(false); // creates an object - it persists across re-renders without causing one

  useEffect(() => {
    if (hasRun.current) return; // .current doe snot rigger a re-render - skip if we already triggered the banners once
    hasRun.current = true; // mark as done before the effect could fire again

    // showBanner is a new function reference every time BannerProvider re-renders
    // (adding/removing a banner both cause a re-render) - without the hasRun guard
    // this effect would refire endlessly - infinite loop
    showBanner("First movie was added to your Bookmarks list.");
    showBanner("Second movie was removed from your Bookmarks list.");
  }, [showBanner]);

  return null; // renders nothing - this component only exists to trigger banners on mount
}

const meta = {
  title: "Component/atoms/BannerList",
  component: BannerListComponent,
  decorators: [
    (Story) => {
      return (
        <BannerProvider>
          <Story />
          <TriggerBanners />
        </BannerProvider>
      );
    },
  ],
} satisfies Meta<typeof BannerListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BannerList: Story = {};
