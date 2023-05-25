import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { ArticleView } from "../../model/const/const";

import cls from "./ArticleListItem.module.scss";
import { Card as CartDeprecated } from "@/shared/ui/deprecated/Card";
import { Card as CardRedesigned } from "@/shared/ui/redesigned/Card";
import { toggleFeatures } from "@/shared/lib/features";

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo(
    ({ className, view }) => {
        const Skeleton = toggleFeatures({
            name: "isAppRedesigned",
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        const Card = toggleFeatures({
            name: "isAppRedesigned",
            on: () => CardRedesigned,
            off: () => CartDeprecated,
        });

        if (view === ArticleView.BIG) {
            return (
                <div className={classNames("", {}, [className, cls[view]])}>
                    <Card>
                        <div className={cls.header}>
                            <Skeleton height={30} width={30} border='50%' />
                            <Skeleton
                                height={16}
                                width={150}
                                className={cls.username}
                            />
                            <Skeleton
                                height={16}
                                width={150}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            height={24}
                            width={250}
                            className={cls.title}
                        />
                        <Skeleton height={200} className={cls.img} />
                        <div className={cls.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div className={classNames("", {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.imageWrapper}>
                        <Skeleton
                            width={200}
                            height={200}
                            className={cls.img}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} className={cls.title} />
                </Card>
            </div>
        );
    }
);
