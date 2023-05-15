import { FC, Fragment, ReactNode } from "react";
import { Listbox as HListBox } from "@headlessui/react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import cls from "./ListBox.module.scss";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/const";
import popupCls from "../../styles/popup.module.scss";

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const ListBox: FC<ListBoxProps> = ({
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom right",
    label,
}) => {
    const optionsClasses = [mapDirectionClass[direction]];

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
                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
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
                                    })}
                                >
                                    {selected && "!!!"}
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
