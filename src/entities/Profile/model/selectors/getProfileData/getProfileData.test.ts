import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileData } from "./getProfileData";

const profileData = {
  name: "Petr",
  age: 30,
  country: Country.Belarus,
  lastname: "Pupkin",
  city: "Biysk",
  username: "Admin",
  currency: Currency.USD,
};

describe("getProfileData.test", () => {
  test("should return data", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: profileData,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(profileData);
  });
  test("should return with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
