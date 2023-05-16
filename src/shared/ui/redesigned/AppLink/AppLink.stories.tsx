import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { AppLink } from "./AppLink";
import { Theme } from "@/shared/const/theme";

export default {
    title: "shared/AppLink",
    component: AppLink,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
    <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    children: "Text",
    variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: "Text",
    variant: "red",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: "Text",
    variant: "primary",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    children: "Text",
    variant: "red",
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
