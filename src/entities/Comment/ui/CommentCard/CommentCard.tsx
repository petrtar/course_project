import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonDRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";

import { Comment } from "../../model/types/comment";

import cls from "./CommentCard.module.scss";
import { getRouteProfile } from "@/shared/const/router";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Card } from "@/shared/ui/redesigned/Card";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(
    ({ className, comment, isLoading }) => {
        const Skeleton = toggleFeatures({
            name: "isAppRedesigned",
            on: () => SkeletonDRedesigned,
            off: () => SkeletonDeprecated,
        });

        if (isLoading) {
            return (
                <VStack
                    data-testid='CommentCard.Loading'
                    gap='8'
                    max
                    className={classNames(cls.CommentCard, {}, [
                        className,
                        cls.loading,
                    ])}
                >
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border='50%' />
                        <Skeleton
                            width={100}
                            height={16}
                            className={cls.username}
                        />
                    </div>
                    <Skeleton width='100%' height={50} />
                </VStack>
            );
        }

        if (!comment) return null;

        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Card padding='24' border='partial' max>
                        <VStack
                            data-testid='CommentCard.Content'
                            max
                            gap='8'
                            className={classNames(
                                cls.CommentCardRedesigned,
                                {},
                                [className]
                            )}
                        >
                            <AppLink to={getRouteProfile(comment.user.id)}>
                                <HStack gap='8'>
                                    {comment.user?.avatar && (
                                        <Avatar
                                            size={30}
                                            src={comment.user.avatar}
                                        />
                                    )}
                                    <Text text={comment.user.username} bold />
                                </HStack>
                            </AppLink>
                            <Text text={comment.text} />
                        </VStack>
                    </Card>
                }
                off={
                    <VStack
                        data-testid='CommentCard.Content'
                        max
                        gap='8'
                        className={classNames(cls.CommentCard, {}, [className])}
                    >
                        <AppLinkDeprecated
                            to={getRouteProfile(comment.user.id)}
                            className={cls.header}
                        >
                            {comment.user?.avatar && (
                                <AvatarDeprecated
                                    size={30}
                                    src={comment.user.avatar}
                                />
                            )}
                            <TextDeprecated
                                className={cls.username}
                                title={comment.user.username}
                            />
                        </AppLinkDeprecated>
                        <TextDeprecated text={comment.text} />
                    </VStack>
                }
            />
        );
    }
);
