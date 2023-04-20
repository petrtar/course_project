import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

import avatar from "@/shared/assets/tests/avatar.jpg";
import { ProfileCard } from "./ProfileCard";


export default {
    title: "entities/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        name: "Petr",
        age: 30,
        country: Country.Belarus,
        lastname: "Pupkin",
        city: "Biysk",
        username: "Admin",
        currency: Currency.USD,
        avatar,
    },
};

export const withError = Template.bind({});
withError.args = {
    error: "error",
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
