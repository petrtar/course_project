import { Fragment, ReactNode, useMemo } from "react";
import { Listbox as HListBox } from "@headlessui/react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import cls from "./ListBox.module.scss";
import { Button } from "../../../Button/Button";
import { mapDirectionClass } from "../../styles/const";
import popupCls from "../../styles/popup.module.scss";
import { HStack } from "../../../../redesigned/Stack";
import ArrowIcon from "@/shared/assets/icons/arrow-default.svg";
import { Icon } from "../../../Icon";

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

export interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export const ListBox = <T extends string>({
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom right",
    label,
}: ListBoxProps<T>) => {
    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

    const selectItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack gap='4'>
            {label && <span>{`${label} >`}</span>}
            <HListBox
                disabled={readonly}
                as='div'
                className={classNames("", {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    as={Button}
                    variant='filled'
                    // @ts-ignore
                    disabled={readonly}
                    addonRight={<Icon Svg={ArrowIcon} />}
                >
                    {selectItem?.content ?? defaultValue}
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                        [popupCls.selected]: selected,
                                    })}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
