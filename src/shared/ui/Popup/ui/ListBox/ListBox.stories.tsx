import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ListBox } from "./ListBox";

export default {
    title: "shared/ListBox",
    component: ListBox,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    value: "123",
    items: [
        { content: "123213213213213", value: "123" },
        { content: "123213213213213142142", value: "1124" },
    ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    direction: "top left",
    value: "123",
    items: [
        { content: "123213213213213", value: "123" },
        { content: "123213213213213142142", value: "1124" },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    value: "123",
    direction: "top right",
    items: [
        { content: "123213213213213", value: "123" },
        { content: "123213213213213142142", value: "1124" },
    ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    value: "123",
    direction: "bottom right",
    items: [
        { content: "123213213213213", value: "123" },
        { content: "123213213213213142142", value: "1124" },
    ],
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
    value: "123",
    direction: "bottom left",
    items: [
        { content: "123213213213213", value: "123" },
        { content: "123213213213213142142", value: "1124" },
    ],
};
