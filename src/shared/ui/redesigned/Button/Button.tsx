import {
    ButtonHTMLAttributes,
    FC,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";
export type ButtonColor = "normal" | "success" | "error";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    color?: ButtonColor;
}

export const Button: FC<ButtonProps> = forwardRef(
    (
        {
            className,
            children,
            variant = "outline",
            size = "m",
            square,
            disabled,
            addonLeft,
            addonRight,
            color = "normal",
            ...otherProps
        },
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
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
                    cls[color],
                ])}
                disabled={disabled}
                ref={ref}
                {...otherProps}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                {children}
                <div className={cls.addonRight}>{addonRight}</div>
            </button>
        );
    }
);
