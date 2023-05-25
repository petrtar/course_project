import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "right" | "left" | "center";

export type TextSize = "s" | "m" | "l";

type HeaderTagType = "h1" | "h2" | "h3";

const mapSizeToClass: Record<TextSize, string> = {
    s: "size_s",
    m: "size_m",
    l: "size_l",
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: "h3",
    m: "h2",
    l: "h1",
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    "data-testid"?: string;
}

export const Text: FC<TextProps> = memo(
    ({
        className,
        title,
        text,
        variant = "primary",
        align = "left",
        size = "m",
        bold,
        "data-testid": dataTestId = "Text",
    }) => {
        const HeaderTag = mapSizeToHeaderTag[size];
        const sizeClass = mapSizeToClass[size];

        const additionalClasses = [
            className,
            cls[variant],
            cls[align],
            sizeClass,
        ];

        return (
            <div
                className={classNames(
                    "",
                    { [cls.bold]: bold },
                    additionalClasses
                )}
            >
                {title && (
                    <HeaderTag
                        data-testid={`${dataTestId}.Header`}
                        className={cls.title}
                    >
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={cls.text}
                    >
                        {text}
                    </p>
                )}
            </div>
        );
    }
);
