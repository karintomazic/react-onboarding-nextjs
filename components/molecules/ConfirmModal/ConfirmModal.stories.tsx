import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ConfirmModalComponent from "./ConfirmModal";
import { fn } from "storybook/test";
import { profilePageLabels } from "@/data/labels";

const meta = {
  title: "Component/molecules/ConfirmModal",
  component: ConfirmModalComponent,
  args: {
    title: profilePageLabels.deleteConfirmTitle,
    message: profilePageLabels.deleteAccountMessage,
    confirmLabel: profilePageLabels.deleteAccountButton,
    cancelLabel: profilePageLabels.cancelLabel,
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmModalComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmModal: Story = {
  args: {
    isPending: false,
  },
};

export const ConfirmModalIsPending: Story = {
  args: {
    isPending: true,
  },
};
