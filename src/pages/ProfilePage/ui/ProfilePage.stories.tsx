import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

import ProfilePage from "./ProfilePage";
import { Theme } from "@/shared/const/theme";

const profileData = {
    form: {
        name: "Petr",
        age: 30,
        country: Country.Belarus,
        lastname: "Pupkin",
        city: "Biysk",
        username: "Admin",
        currency: Currency.USD,
        avatar: "https://cs10.pikabu.ru/images/community/2064/1605883416236930302.png",
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
