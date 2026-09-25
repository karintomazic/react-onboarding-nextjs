import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoginFormComponent from "./LoginForm";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/LoginForm",
  component: LoginFormComponent,
  args: {
    handleSubmit: fn(),
    isSubmitting: false,
    allErrors: null,
    clearFieldError: fn(),
  },
} satisfies Meta<typeof LoginFormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};

export const LoginFormErrorMessage: Story = {
  args: {
    allErrors: {
      fieldErrors: {},
      formErrors: ["Something went wrong, please try again"],
    },
  },
};

export const LoginFormIsSubmitting: Story = {
  args: {
    isSubmitting: true,
  },
};
