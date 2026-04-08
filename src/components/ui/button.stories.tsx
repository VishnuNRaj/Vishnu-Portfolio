import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Start a project",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Explore work
        <ArrowRight className="size-4" />
      </>
    ),
  },
};
