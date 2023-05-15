import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/AuthByUsername";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextTheme } from "@/shared/ui/deprecated/Text";

import { NotificationButton } from "@/features/notificationButton";
import { AvatarDropdown } from "@/features/avatarDropdown";
import cls from "./Navbar.module.scss";
import { getRouteArticleCreate } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/lib/features";
import { HStack } from "@/shared/ui/deprecated/Stack";
import { AppLink, AppLinkTheme } from "@/shared/ui/deprecated/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <header
                        className={classNames(cls.NavbarRedesign, {}, [
                            className,
                        ])}
                    >
                        <HStack gap='16' className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(cls.Navbar, {}, [className])}>
                        <Text
                            className={cls.appName}
                            title={t("Ulbi TV App")}
                            theme={TextTheme.INVERTED}
                        />
                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                        >
                            {t("Создать статью")}
                        </AppLink>
                        <HStack gap='16' className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                onClick={onShowModal}
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
            >
                {t("Войти")}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </header>
    );
});
