import { FC, memo } from "react";
import { ArticlesFilters } from "@/widgets/ArticledFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer: FC<FiltersContainerProps> = memo(
    ({ className }) => {
        const {
            order,
            sort,
            onChangeOrder,
            onChangeSort,
            search,
            onChangeSearch,
            onChangeType,
            type,
        } = useArticleFilters();
        return (
            <ArticlesFilters
                type={type}
                order={order}
                search={search}
                sort={sort}
                onChangeSearch={onChangeSearch}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
                onChangeType={onChangeType}
                className={className}
            />
        );
    }
);
