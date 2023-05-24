import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popup";

import { Country } from "../../model/types/coutry";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popup";

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect: FC<CountrySelectProps> = memo(
    ({ className, value, onChange, readonly }) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange]
        );

        const props = {
            className,
            defaultValue: t("Укажите страну"),
            label: t("Укажите страну"),
            value,
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: "top right" as const,
        };

        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    }
);
