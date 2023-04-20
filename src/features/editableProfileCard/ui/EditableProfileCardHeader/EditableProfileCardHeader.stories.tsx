import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { EditableProfileHeader } from "./EditableProfileCardHeader";

export default {
    title: "features/EditableProfileCard/EditableProfileCardHeader",
    component: EditableProfileHeader,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof EditableProfileHeader>;

const Template: ComponentStory<typeof EditableProfileHeader> = (args) => (
    <EditableProfileHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
