import { FC, memo } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "red";

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo(
    ({
        className,
        children,
        to,
        variant = "primary",
        activeClassName = "",
        ...otherProps
    }) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    classNames("", { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                    ])
                }
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    }
);
