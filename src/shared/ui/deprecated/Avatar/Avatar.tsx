import { CSSProperties, FC, memo, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Avatar.module.scss";
import { AppImage } from "../AppImage";

import UserIcon from "../../../assets/icons/user.svg";
import { Skeleton } from "../Skeleton";
import { Icon } from "../Icon";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const Avatar: FC<AvatarProps> = memo(
    ({ className, src, size = 100, alt, fallbackInverted }) => {
        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size]
        );

        const fallback = <Skeleton width={size} height={size} border='50%' />;

        const errorFallback = (
            <Icon
                width={size}
                height={size}
                inverted={fallbackInverted}
                Svg={UserIcon}
            />
        );

        return (
            <AppImage
                className={classNames(cls.Avatar, {}, [className])}
                style={styles}
                src={src}
                alt={alt}
                fallback={fallback}
                errorFallback={errorFallback}
            />
        );
    }
);
