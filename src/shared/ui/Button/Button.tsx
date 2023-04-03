import { ButtonHTMLAttributes, FC, memo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
    "CLEAR" = "clear",
    "CLEAR_INVERTED" = "clearInverted",
    "OUTLINE" = "outline",
    "OUTLINE_RED" = "outline_red",
    "BACKGROUND" = "background",
    "BACKGROUND_INVERTED" = "backgroundInverted",
}

export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo(
    ({
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        size = ButtonSize.M,
        square,
        disabled,
        ...otherProps
    }) => {
        const mods: Mods = {
            [cls[theme]]: true,
            [cls.square]: square,
            [cls[size]]: true,
            [cls.disabled]: disabled,
        };

        return (
            <button
                type='button'
                className={classNames(cls.Button, mods, [className])}
                disabled={disabled}
                {...otherProps}
            >
                {children}
            </button>
        );
    }
);
