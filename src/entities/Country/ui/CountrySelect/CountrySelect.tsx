import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Select } from "shared/ui/Select/Select";
import { classNames } from "shared/lib/classNames/classNames";

import { Country } from "../../model/types/coutry";

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

export const CountrySelect: FC<CountrySelectProps> = memo(({ className, value, onChange, readonly }) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange]
    );

    return (
        <Select
            className={classNames("", {}, [className])}
            label={t("Укажите страну")}
            value={value}
            onChange={onChangeHandler}
            options={options}
            readonly={readonly}
        />
    );
});
