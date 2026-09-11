import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageSwitcherHandler from "./LanguageSwitcherHandler";
import { expect } from "storybook/test";

const meta = {
  title: "Component/organisms/LanguageSwitcher",
  component: LanguageSwitcherHandler,
  loaders: [
    () => {
      localStorage.removeItem("selectedMain");
      localStorage.removeItem("selectedFallback");
      return {};
    },
  ],
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof LanguageSwitcherHandler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    const langButton = canvas.getByRole("button", {
      name: /language settings/i,
    });
    await userEvent.click(langButton);
  },
};

export const OpenFilter: Story = {
  play: async ({ canvas, userEvent }) => {
    const langButton = canvas.getByRole("button", {
      name: /language settings/i,
    });
    await userEvent.click(langButton);

    const buttonDefaultLanguage = canvas.getAllByRole("button", {
      name: /afrikaans/i,
    })[0];
    if (!buttonDefaultLanguage) throw new Error("Afrikaans button not found");
    await userEvent.click(buttonDefaultLanguage);

    await expect(
      canvas.getByRole("group", { name: /language preferences/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("textbox", { name: /filter languages/i }),
    ).toBeVisible();
  },
};

export const ClickOutsideClosesPickBox: Story = {
  play: async ({ canvas, userEvent }) => {
    // open the pick box
    const langButton = canvas.getByRole("button", {
      name: /language settings/i,
    });
    await userEvent.click(langButton);

    await expect(
      canvas.getByRole("group", { name: /language preferences/i }),
    ).toBeVisible();

    // click outside
    await userEvent.click(document.body);

    await expect(
      canvas.queryByRole("group", { name: /language preferences/i }),
    ).not.toBeInTheDocument();
  },
};

export const ClickOutsideClosesAll: Story = {
  play: async ({ canvas, userEvent }) => {
    // open the pick box
    const langButton = canvas.getByRole("button", {
      name: /language settings/i,
    });
    await userEvent.click(langButton);

    const buttonDefaultLanguage = canvas.getAllByRole("button", {
      name: /afrikaans/i,
    })[0];
    if (!buttonDefaultLanguage) throw new Error("Afrikaans button not found");
    await userEvent.click(buttonDefaultLanguage); // open autocomplete list

    await expect(
      canvas.getByRole("group", { name: /language preferences/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("textbox", { name: /filter languages/i }),
    ).toBeVisible();

    // click outside
    await userEvent.click(document.body);

    // checks if both are closed
    await expect(
      canvas.queryByRole("group", { name: /language preferences/i }),
    ).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole("textbox", { name: /filter languages/i }),
    ).not.toBeInTheDocument();
  },
};
