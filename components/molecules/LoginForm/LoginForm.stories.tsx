import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoginFormComponent from "./LoginForm";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/LoginForm",
  component: LoginFormComponent,
  args: {
    handleSubmit: fn(),
    isSubmitting: false,
    error: "",
  },
} satisfies Meta<typeof LoginFormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};

export const LoginFormErrorMessage: Story = {
  args: {
    error: "Something went wrong, please try again",
  },
};

export const LoginFormIsSubmitting: Story = {
  args: {
    isSubmitting: true,
  },
};
