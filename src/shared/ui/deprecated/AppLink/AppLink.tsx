import { FC, memo } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const AppLink: FC<AppLinkProps> = memo(
    ({
        className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    }) => {
        return (
            <Link
                to={to}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
                {...otherProps}
            >
                {children}
            </Link>
        );
    }
);
