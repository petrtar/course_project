import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";

import { Text, TextSize, TextTheme } from "./Text";
import { Theme } from "@/shared/const/theme";

export default {
    title: "shared/Text",
    component: Text,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: "Title loren ipsun",
    text: "Description",
};

export const Error = Template.bind({});
Error.args = {
    title: "Title loren ipsun",
    text: "Description",
    theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: "Title loren ipsun",
};

export const onlyText = Template.bind({});
onlyText.args = {
    text: "Description",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: "Title loren ipsun",
    text: "Description",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: "Title loren ipsun",
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: "Description",
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: "Title loren ipsun",
    text: "Description",
    size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: "Title loren ipsun",
    text: "Description",
    size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
    title: "Title loren ipsun",
    text: "Description",
    size: TextSize.S,
};
