import { FC, memo, ReactNode, useCallback } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "../Card/Card";

import cls from "./Tabs.module.scss";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabLick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs: FC<TabsProps> = memo(
    ({ className, tabs, value, onTabLick, direction = "row" }) => {
        const clickHandle = useCallback(
            (tab: TabItem) => {
                return () => {
                    onTabLick(tab);
                };
            },
            [onTabLick]
        );

        return (
            <Flex
                className={classNames(cls.Tabs, {}, [className])}
                direction={direction}
                gap='8'
                align='start'
            >
                {tabs.map((tab) => {
                    const isSelected = tab.value === value;
                    return (
                        <Card
                            variant={isSelected ? "light" : "normal"}
                            key={tab.value}
                            className={classNames(cls.tab, {
                                [cls.selected]: isSelected,
                            })}
                            onClick={clickHandle(tab)}
                            border='round'
                        >
                            {tab.content}
                        </Card>
                    );
                })}
            </Flex>
        );
    }
);
