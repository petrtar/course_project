import { FC, ReactNode } from "react";
import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";

import { mapDirectionClass } from "../../styles/const";

import popupCls from "../../styles/popup.module.scss";
import cls from "./Popover.module.scss";
import { DropdownDirection } from "@/shared/types/ui";

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover: FC<PopoverProps> = ({
    className,
    direction = "bottom right",
    trigger,
    children,
}) => {
    const menuClasses = [mapDirectionClass[direction], popupCls.menu];
    return (
        <HPopover className={classNames("", {}, [className, popupCls.popup])}>
            <HPopover.Button as='div' className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};
