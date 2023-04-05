import { FC, memo, MutableRefObject, ReactNode, useRef, UIEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { getUiScrollByPath, uiActions } from "features/UI";
import { StateSchema } from "app/providers/StoreProvider";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";

import cls from "./Page.module.scss";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
    ({ className, children, onScrollEnd }) => {
        const dispatch = useAppDispatch();
        const { pathname } = useLocation();

        const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
        const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

        const scrollPosition = useSelector((state: StateSchema) =>
            getUiScrollByPath(state, pathname)
        );

        useInfiniteScroll({
            triggerRef,
            wrapperRef,
            callback: onScrollEnd,
        });

        useInitialEffect(() => {
            wrapperRef.current.scrollTop = scrollPosition;
        });

        const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
            dispatch(
                uiActions.setScrollPosition({
                    position: e.currentTarget.scrollTop,
                    path: pathname,
                })
            );
        }, 500);

        return (
            <main
                onScroll={onScroll}
                ref={wrapperRef}
                className={classNames(cls.Page, {}, [className])}
            >
                {children}
                {!!onScrollEnd && (
                    <div className={cls.trigger} ref={triggerRef} />
                )}
            </main>
        );
    }
);
