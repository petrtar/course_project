import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { ArticleDetails } from "pages/ArticleDetailsPage";
import ArticlesPage from "pages/ArticlesPage/ui/ArticlesPage/ArticlesPage";
import { ArticleEditPage } from "pages/ArticleEditPage";

export type AppRoutersProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    ARTICLES = "articles",
    ARTICLE_DETAILS = "article_details",
    ARTICLE_CREATE = "article_create",
    ARTICLE_EDIT = "article_edit",
    NOT_FOUND = "not_found",
}

export const RouterPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.PROFILE]: "/profile/", // + :id
    [AppRoutes.ARTICLES]: "/articles",
    [AppRoutes.ARTICLE_DETAILS]: "/articles/", // + :id
    [AppRoutes.ARTICLE_CREATE]: "/articles/new",
    [AppRoutes.ARTICLE_EDIT]: "/articles/:id/edit",
    [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutersProps> = {
    [AppRoutes.MAIN]: {
        path: RouterPath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RouterPath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RouterPath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RouterPath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RouterPath.article_details}:id`,
        element: <ArticleDetails />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RouterPath.article_create}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RouterPath.article_edit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <NotFoundPage />,
    },
};
