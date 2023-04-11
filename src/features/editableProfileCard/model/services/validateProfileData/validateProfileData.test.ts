import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

import { validateProfileData } from "./validateProfileData";

const data = {
    name: "Petr",
    age: 30,
    country: Country.Belarus,
    lastname: "Pupkin",
    city: "Biysk",
    username: "Admin",
    currency: Currency.USD,
};

describe("validateProfileData.test.test", () => {
    test("success", async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test("without name and lastname", async () => {
        const result = validateProfileData({ ...data, name: "", lastname: "" });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
    test("incorrect age", async () => {
        const result = validateProfileData({ ...data, age: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
    test("incorrect country", async () => {
        const result = validateProfileData({ ...data, country: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });
    test("incorrect all", async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
