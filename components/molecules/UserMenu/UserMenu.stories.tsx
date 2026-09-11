import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userMenuLabels } from "../../../data/labels";
import UserMenu from "./UserMenu";
import { http, HttpResponse } from "msw";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/molecules/UserMenu",
  component: UserMenu,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    loginLabel: userMenuLabels.login,
    joinLabel: userMenuLabels.join,
  },
  parameters: {
    session: null,
  },
};

export const LoggedIn: Story = {
  args: {
    loginLabel: userMenuLabels.login,
    joinLabel: userMenuLabels.join,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
  parameters: {
    session: mockSession,
    msw: {
      handlers: [
        // mocks fetch crf token before sign out
        http.get("/api/auth/csrf", () =>
          HttpResponse.json({ csrfToken: "mock" }),
        ),
        http.post("/api/auth/signout", () => HttpResponse.json({})),
        http.get("/api/auth/session", () => HttpResponse.json({})),
      ],
    },
  },
};
