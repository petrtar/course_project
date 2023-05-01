import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";

import { AvatarDropdown } from "./AvatarDropdown";

export default {
    title: "features/AvatarDropdown",
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
    <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: "1",
            },
        },
    }),
];
