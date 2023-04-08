import { Menu } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../AppLink/AppLink";

import cls from "./Dropdown.module.scss";

interface DropdownItems {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    "bottom left": cls.optionsBottomLeft,
    "bottom right": cls.optionsBottomRight,
    "top left": cls.optionsTopLeft,
    "top right": cls.optionsTopRight,
};

interface DropdownProps {
    className?: string;
    items: DropdownItems[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({
    className,
    trigger,
    items,
    direction = "bottom right",
}) => {
    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            onClick={item.onClick}
                            type='button'
                            disabled={item.disabled}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
