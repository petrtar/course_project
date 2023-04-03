import { classNames } from "shared/lib/classNames/classNames";

describe("classNames", () => {
    test("with first param", () => {
        expect(classNames("soneClass")).toBe("soneClass");
    });
    test("with additional class", () => {
        const expected = "soneClass class1 class2";
        expect(classNames("soneClass", {}, ["class1", "class2"])).toBe(
            expected
        );
    });
    test("with mods", () => {
        const expected = "soneClass class1 class2 hovered scrollable";
        expect(
            classNames("soneClass", { hovered: true, scrollable: true }, [
                "class1",
                "class2",
            ])
        ).toBe(expected);
    });
    test("with mods false", () => {
        const expected = "soneClass class1 class2 hovered";
        expect(
            classNames("soneClass", { hovered: true, scrollable: false }, [
                "class1",
                "class2",
            ])
        ).toBe(expected);
    });
    test("with mods undefined", () => {
        const expected = "soneClass class1 class2 hovered";
        expect(
            classNames("soneClass", { hovered: true, scrollable: undefined }, [
                "class1",
                "class2",
            ])
        ).toBe(expected);
    });
});
