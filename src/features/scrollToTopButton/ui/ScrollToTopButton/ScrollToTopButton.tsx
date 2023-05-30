import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "@/shared/ui/redesigned/Icon";
import CircleIcon from "@/shared/assets/icons/arrow-up.svg";

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = memo(
    ({ className }) => {
        const onClick = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        return (
            <Icon
                Svg={CircleIcon}
                clickable
                width={32}
                height={32}
                onClick={onClick}
                className={classNames("", {}, [className])}
            />
        );
    }
);
