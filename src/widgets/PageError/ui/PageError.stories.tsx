import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PageError } from "./PageError";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "widget/PageError",
  component: PageError,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PageError>;
PageError;
const Template: ComponentStory<typeof PageError> = (args) => <PageError {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];