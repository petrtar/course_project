import { UseTheme } from "app/providers/ThemeProviders";
import { FC, ReactNode } from "react";

import { classNames, Mods } from "shared/lib/classNames/classNames";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";

import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
}

export const Modal: FC<ModalProps> = ({
    children,
    isOpen,
    onClose,
    className,
}) => {
    const { theme } = UseTheme();

    const { close, isClosing } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    "app_modal",
                ])}
            >
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
