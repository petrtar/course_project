import { FC, memo } from "react";
import { RouterPath } from "shared/config/routeConfig/routeConfig";

import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text } from "shared/ui/Text/Text";

import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>
        );
    }

    if (!comment) return null;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${RouterPath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user?.avatar && <Avatar size={30} src={comment.user.avatar} />}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </div>
    );
});
