import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popup";

import { Currency } from "../../model/types/currency";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popup";

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect: FC<CurrencySelectProps> = memo(
    ({ className, value, onChange, readonly }) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange]
        );

        const props = {
            className,
            defaultValue: t("Укажите валюту"),
            label: t("Укажите валюту"),
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
