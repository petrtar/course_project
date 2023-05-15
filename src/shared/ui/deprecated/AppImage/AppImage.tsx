import {
    FC,
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from "react";

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

/**
 * @deprecated
 */

export const AppImage: FC<AppImageProps> = memo(
    ({
        className,
        src,
        alt = "image",
        fallback,
        errorFallback,
        ...otherProps
    }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        useLayoutEffect(() => {
            const img = new Image();
            img.src = src ?? "";
            img.onload = () => {
                setIsLoading(false);
            };
            img.onerror = () => {
                setIsLoading(false);
                setHasError(true);
            };
        }, []);

        if (isLoading && fallback) {
            return fallback;
        }

        if (hasError && errorFallback) {
            return errorFallback;
        }

        return (
            <img src={src} alt={alt} className={className} {...otherProps} />
        );
    }
);
