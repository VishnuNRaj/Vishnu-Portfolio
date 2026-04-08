import type { Meta, StoryObj } from "@storybook/nextjs";

import { SurfaceCard } from "@/components/ui/surface-card";

const meta = {
  title: "UI/SurfaceCard",
  component: SurfaceCard,
  args: {
    children: <div />,
  },
  parameters: {
    layout: "padded",
  },
  render: () => (
    <SurfaceCard className="w-[420px] p-8">
      <div className="space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
          System Profile
        </p>
        <h3 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
          Reusable surface container
        </h3>
        <p className="text-base leading-8 text-muted">
          Use this as the shared shell for highlighted content blocks, project cards,
          and feature panels.
        </p>
      </div>
    </SurfaceCard>
  ),
} satisfies Meta<typeof SurfaceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
