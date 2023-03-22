import { FC, HTMLAttributes, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: FC<CardProps> = memo(({ className, children, ...otherProps }) => {
  return (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
});
