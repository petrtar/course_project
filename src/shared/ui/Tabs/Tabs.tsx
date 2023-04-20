import { FC, memo, ReactNode, useCallback } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, CardTheme } from "../Card/Card";

import cls from "./Tabs.module.scss";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabLick: (tab: TabItem) => void;
}

export const Tabs: FC<TabsProps> = memo(
    ({ className, tabs, value, onTabLick }) => {
        const clickHandle = useCallback(
            (tab: TabItem) => {
                return () => {
                    onTabLick(tab);
                };
            },
            [onTabLick]
        );

        return (
            <div className={classNames(cls.Tabs, {}, [className])}>
                {tabs.map((tab) => (
                    <Card
                        theme={
                            tab.value === value
                                ? CardTheme.NORMAL
                                : CardTheme.OUTLINED
                        }
                        key={tab.value}
                        className={cls.tsb}
                        onClick={clickHandle(tab)}
                    >
                        {tab.content}
                    </Card>
                ))}
            </div>
        );
    }
);
