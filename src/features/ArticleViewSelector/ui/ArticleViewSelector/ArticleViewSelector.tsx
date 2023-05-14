import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";

import ListIcon from "@/shared/assets/icons/list.svg";
import TiledIcon from "@/shared/assets/icons/tiled.svg";

import cls from "./ArticleViewSelector.module.scss";
import { ArticleView } from "@/entities/Article";

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
    ({ className, view, onViewClick }) => {
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <div className={classNames("", {}, [className])}>
                {viewTypes.map((viewType) => (
                    <Button
                        key={viewType.view}
                        theme={ButtonTheme.CLEAR}
                        onClick={onClick(viewType.view)}
                    >
                        <Icon
                            width={24}
                            height={24}
                            Svg={viewType.icon}
                            className={classNames(
                                "",
                                { [cls.notSelected]: viewType.view !== view },
                                [className]
                            )}
                        />
                    </Button>
                ))}
            </div>
        );
    }
);
