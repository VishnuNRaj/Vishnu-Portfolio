import type { Meta, StoryObj } from "@storybook/nextjs";

import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Next.js / TypeScript / GSAP",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
