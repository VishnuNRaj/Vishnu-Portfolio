import type { Preview } from "@storybook/nextjs";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "portfolio",
      values: [
        { name: "portfolio", value: "#f5f2ea" },
        { name: "night", value: "#11100d" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
