import { FC, memo } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";

import { ArticleView } from "../../model/types/article";

import ListIcon from "shared/assets/icons/list.svg";
import TiledIcon from "shared/assets/icons/tiled.svg";

import cls from "./ArticleViewSelector.module.scss";

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

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(({ className, view, onViewClick }) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames("", {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)}>
          <Icon Svg={viewType.icon} className={classNames("", { [cls.notSelected]: viewType.view !== view }, [className])} />
        </Button>
      ))}
    </div>
  );
});
