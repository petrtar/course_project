import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileForm } from "./getProfileForm";

const profileData = {
    name: "Petr",
    age: 30,
    country: Country.Belarus,
    lastname: "Pupkin",
    city: "Biysk",
    username: "Admin",
    currency: Currency.USD,
};

describe("getProfileForm.test", () => {
    test("should return form", () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: profileData,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(profileData);
    });
    test("should return with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
