import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotificationItem } from "./NotificationItem";

const notificationItem = {
    id: "1",
    title: "Уведомление 1",
    description: "Описание уведомления",
    userId: "1",
};

export default {
    title: "shared/NotificationItem",
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    item: notificationItem,
};
