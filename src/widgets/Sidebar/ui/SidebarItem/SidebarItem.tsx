import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";

import { classNames } from "@/shared/lib/classNames/classNames";
import { SidebarItemType } from "../../model/types/sidebar";

import cls from "./SidebarItem.module.scss";
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from "@/shared/ui/deprecated/AppLink";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo(({ item, collapsed }) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <AppLink
                    className={classNames(cls.itemRedesigned, {
                        [cls.collapsedRedesigned]: collapsed,
                    })}
                    to={item.path}
                    activeClassName={cls.active}
                >
                    <Icon Svg={item.Icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLink>
            }
            off={
                <AppLinkDeprecated
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                    theme={AppLinkTheme.SECONDARY}
                    to={item.path}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLinkDeprecated>
            }
        />
    );
});
