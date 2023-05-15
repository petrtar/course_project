import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import "./Loader.scss";

interface LoaderProps {
    className?: string;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const Loader: FC<LoaderProps> = ({ className }) => {
    return (
        <div className={classNames("lds-ellipsis", {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
