import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated, TextAlign } from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";

import { ArticleImageBlock } from "../../model/types/article";

import cls from "./ArticleImageBlockComponent.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> =
    memo(({ className, block }) => {
        return (
            <div
                className={classNames(cls.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <img src={block.src} className={cls.img} alt={block.title} />
                {block.title && (
                    <ToggleFeatures
                        feature='isAppRedesigned'
                        on={
                            <Text text={block.title} align={TextAlign.CENTER} />
                        }
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={TextAlign.CENTER}
                            />
                        }
                    />
                )}
            </div>
        );
    });
