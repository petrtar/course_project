import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";

import AboutIconDeprecated from "@/shared/assets/icons/about.svg";
import MainIconDeprecated from "@/shared/assets/icons/main.svg";
import ProfileIconDeprecated from "@/shared/assets/icons/profile.svg";
import ArticleIconDeprecated from "@/shared/assets/icons/article.svg";

import AboutIcon from "@/shared/assets/icons/info.svg";
import MainIcon from "@/shared/assets/icons/home.svg";
import ProfileIcon from "@/shared/assets/icons/avatar.svg";
import ArticleIcon from "@/shared/assets/icons/article-icon.svg";

import { SidebarItemType } from "../types/sidebar";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from "@/shared/const/router";
import { toggleFeatures } from "@/shared/lib/features";

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: "Главная",
            Icon: toggleFeatures({
                name: "isAppRedesigned",
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
        },
        {
            path: getRouteAbout(),
            text: "О нас",
            Icon: toggleFeatures({
                name: "isAppRedesigned",
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                text: "Профиль",
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: "Статьи",
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
};
