import { classNames, Mods } from "shared/lib/classNames/classNames";
import React, { memo, ReactNode } from "react";

import { UseTheme } from "app/providers/ThemeProviders";
import cls from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, onClose, isOpen } = props;
    const { theme } = UseTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, mods, [
                    className,
                    theme,
                    "app_drawer",
                ])}
            >
                <Overlay onClick={onClose} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
});