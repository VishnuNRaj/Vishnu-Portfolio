import type { Meta, StoryObj } from "@storybook/nextjs";

import { SectionHeading } from "@/components/ui/section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  args: {
    eyebrow: "Selected Work",
    title: "Recent systems shaped for speed, clarity, and scale.",
    description:
      "A reusable heading primitive for the main content sections of the portfolio.",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    align: "center",
  },
};
