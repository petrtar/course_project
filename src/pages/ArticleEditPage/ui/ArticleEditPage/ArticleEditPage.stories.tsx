import { ComponentStory, ComponentMeta } from "@storybook/react";

import ArticleEditPage from "./ArticleEditPage";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "shared/ArticleEditPage",
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
