import { ButtonHTMLAttributes, FC, ReactNode, memo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo(
    ({
        className,
        children,
        variant = "outline",
        size = "m",
        square,
        disabled,
        addonLeft,
        addonRight,
        ...otherProps
    }) => {
        const mods: Mods = {
            [cls.square]: square,
            [cls.disabled]: disabled,
        };

        return (
            <button
                type='button'
                className={classNames(cls.Button, mods, [
                    className,
                    cls[variant],
                    cls[size],
                ])}
                disabled={disabled}
                {...otherProps}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                {children}
                <div className={cls.addonRight}>{addonRight}</div>
            </button>
        );
    }
);
