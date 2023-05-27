import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import { ArticleCodeBlock } from "../../model/types/article";

import cls from "./ArticleCodeBlockComponent.module.scss";
import { Code as CodeDeprecated } from "@/shared/ui/deprecated/Code";
import { Code } from "@/shared/ui/redesigned/Code";
import { ToggleFeatures } from "@/shared/lib/features";

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
    memo(({ className, block }) => {
        return (
            <div
                className={classNames(cls.ArticleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <ToggleFeatures
                    feature='isAppRedesigned'
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </div>
        );
    });
