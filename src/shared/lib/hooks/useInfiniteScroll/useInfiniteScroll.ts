import { MutableRefObject, useEffect } from "react";

export interface UseInfiniteScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollProps) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const wrapperElement = wrapperRef?.current || null;
        const triggerElement = triggerRef.current;
        if (!callback) return;
        const options = {
            root: wrapperElement,
            rootMargin: "0px",
            threshold: 1.0,
        };

        observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(triggerElement);

        // eslint-disable-next-line consistent-return
        return () => {
            if (observer) {
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
