import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "shared/ArticleDetailsPageHeader",
  component: ArticleDetailsPageHeader,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
