import { ComponentStory, ComponentMeta } from "@storybook/react";

import AboutPage from "./AboutPage";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "pages/AboutPage",
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
