import { createSelector } from "@reduxjs/toolkit";

import { getUserAuthData } from "@/entities/User";

import AboutIcon from "@/shared/assets/icons/about.svg";
import MainIcon from "@/shared/assets/icons/main.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";

import { SidebarItemType } from "../types/sidebar";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: "Главная",
            Icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: "О нас",
            Icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                text: "Профиль",
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: "Статьи",
                Icon: ArticleIcon,
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});
