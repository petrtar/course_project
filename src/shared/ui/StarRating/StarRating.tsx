import { FC, memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./StarRating.module.scss";
import { Icon } from "../Icon/Icon";

import StarIcon from "../../assets/icons/star.svg";

const stars = [1, 2, 3, 4, 5];

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

export const StarRating: FC<StarRatingProps> = memo(
    ({ className, size = 30, selectedStars = 0, onSelect }) => {
        const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
        const [isSelected, setIsSelected] = useState(!!selectedStars);

        const onHover = (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarCount(starsCount);
            }
        };

        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarCount(0);
            }
        };

        const onClick = (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarCount(starsCount);
                setIsSelected(true);
            }
        };

        return (
            <div className={classNames(cls.StarRating, {}, [className])}>
                {stars.map((starNumber) => (
                    <Icon
                        Svg={StarIcon}
                        key={starNumber}
                        className={classNames(
                            cls.starIcon,
                            { [cls.selected]: isSelected },
                            [
                                currentStarCount >= starNumber
                                    ? cls.hovered
                                    : cls.normal,
                            ]
                        )}
                        width={size}
                        height={size}
                        onMouseEnter={onHover(starNumber)}
                        onMouseLeave={onLeave}
                        onClick={onClick(starNumber)}
                    />
                ))}
            </div>
        );
    }
);
