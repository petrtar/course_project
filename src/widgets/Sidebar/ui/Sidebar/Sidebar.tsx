import { FC, memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { classNames } from "@/shared/lib/classNames/classNames";

import { SidebarItem } from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";

import cls from "./Sidebar.module.scss";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { AppLogo } from "@/shared/ui/deprecated/AppLogo";

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItemList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemList = useMemo(
        () =>
            sidebarItemList.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemList]
    );

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            off={
                <aside
                    data-testid='sidebar'
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className]
                    )}
                >
                    <Button
                        data-testid='sidebar-toggle'
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? ">" : "<"}
                    </Button>
                    <VStack role='navigation' gap='8' className={cls.items}>
                        {itemList}
                    </VStack>
                    <div className={cls.swithers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            }
            on={
                <aside
                    data-testid='sidebar'
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsed]: collapsed },
                        [className]
                    )}
                >
                    <AppLogo className={cls.appLogo} />
                </aside>
            }
        />
    );
});
