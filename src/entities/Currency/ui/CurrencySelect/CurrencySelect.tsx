import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/Popup";

import { Currency } from "../../model/types/currency";

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

        return (
            <ListBox
                className={className}
                defaultValue={t("Укажите валюту")}
                label={t("Укажите валюту")}
                value={value}
                items={options}
                onChange={onChangeHandler}
                readonly={readonly}
                direction='top right'
            />
        );
    }
);
