import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Flex.module.scss";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type flexGap = "4" | "8" | "16" | "32";

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const gapClasses: Record<flexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: flexGap;
    max?: boolean;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const Flex: FC<FlexProps> = ({
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    gap,
    max,
    ...otherProps
}) => {
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods = {
        [cls.max]: max,
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
