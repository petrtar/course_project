import { FC, ReactNode } from "react";

import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";

import cls from "./Modal.module.scss";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Portal } from "../Portal";
import { toggleFeatures } from "@/shared/lib/features";

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
    const { theme } = useTheme();

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
                    toggleFeatures({
                        name: "isAppRedesigned",
                        on: () => cls.modalNew,
                        off: () => cls.modalOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
