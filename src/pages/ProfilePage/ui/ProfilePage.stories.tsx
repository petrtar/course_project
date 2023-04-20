import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProviders";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

import avatar from "@/shared/assets/tests/avatar.jpg";
import ProfilePage from "./ProfilePage";

const profileData = {
    form: {
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

export default {
    title: "pages/ProfilePage",
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile: profileData,
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: profileData,
    }),
];
