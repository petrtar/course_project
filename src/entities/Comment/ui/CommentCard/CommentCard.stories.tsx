import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CommentCard } from "./CommentCard";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "shared/CommentCard",
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
