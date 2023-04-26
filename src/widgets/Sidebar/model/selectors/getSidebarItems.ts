import { createSelector } from "@reduxjs/toolkit";

import { getUserAuthData } from "@/entities/User";

import AboutIcon from "@/shared/assets/icons/about.svg";
import MainIcon from "@/shared/assets/icons/main.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";

import { SidebarItemType } from "../types/sidebar";
import { RouterPath } from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: RouterPath.main,
            text: "Главная",
            Icon: MainIcon,
        },
        {
            path: RouterPath.about,
            text: "О нас",
            Icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: `${RouterPath.profile}${userData?.id}`,
                text: "Профиль",
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RouterPath.articles,
                text: "Статьи",
                Icon: ArticleIcon,
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});
