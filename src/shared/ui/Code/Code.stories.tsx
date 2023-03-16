import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Code } from "./Code";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "shared/Code",
  component: Code,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  text: `
  import { ComponentStory, ComponentMeta } from "@storybook/react";

  import { Code } from "./Code";
  import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
  import { Theme } from "app/providers/ThemeProviders";
  
  export default {
    title: "shared/Code",
    component: Code,
    argTypes: {
      backgroundColor: { control: "color" },
    },
  } as ComponentMeta<typeof Code>;
  
  const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;
  `,
};
