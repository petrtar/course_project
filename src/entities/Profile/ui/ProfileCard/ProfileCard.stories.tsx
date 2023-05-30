import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

import { ProfileCard } from "./ProfileCard";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { NewDesignDecorator } from "@/shared/config/storybook/NewDesignDecorator";

export default {
    title: "entities/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const PrimaryArgs = {
    data: {
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

export const Primary = Template.bind({});
Primary.args = PrimaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = PrimaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const withError = Template.bind({});
withError.args = {
    error: "error",
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
