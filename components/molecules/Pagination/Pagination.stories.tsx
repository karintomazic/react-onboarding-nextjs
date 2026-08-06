import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PaginationComponent from "./Pagination";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";

// update the page arg - so the links update visually
// watch the url and copy the page value into the story arg when it changes
function PageSync({
  updateArgs,
}: {
  updateArgs: (args: { page: number }) => void;
}) {
  // read current url searh params
  const searchParams = useSearchParams();

  useEffect(() => {
    // if the url has no page params, stop
    // - so we dont override the page number
    if (!searchParams.has("page")) return;

    // get the page number from the url - turn into number
    const page = Number(searchParams.get("page") ?? "1");
    // to see it in the actions tab
    action("page-changed")(page);
    // put the new page number into the sotrys args
    // makes pagination re-render with the new page
    updateArgs({ page });
  }, [searchParams, updateArgs]);

  return null;
}

const meta = {
  title: "Component/molecules/Pagination",
  component: PaginationComponent,
  decorators: [
    (Story) => {
      // get and change the sotrys args
      const [, updateArgs] = useArgs();

      return (
        <>
          <PageSync updateArgs={updateArgs} />
          <Story />
        </>
      );
    },
  ],
} satisfies Meta<typeof PaginationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
  },
};
