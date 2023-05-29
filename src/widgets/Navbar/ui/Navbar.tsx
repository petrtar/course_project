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
import { toggleFeatures, ToggleFeatures } from "@/shared/lib/features";
import { AppLink, AppLinkTheme } from "@/shared/ui/deprecated/AppLink";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button";
import { Button } from "@/shared/ui/redesigned/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";

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

    const mainClass = toggleFeatures({
        name: "isAppRedesigned",
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap='16' className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
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
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Button
                        onClick={onShowModal}
                        variant='clear'
                        className={cls.links}
                    >
                        {t("Войти")}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        onClick={onShowModal}
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                    >
                        {t("Войти")}
                    </ButtonDeprecated>
                }
            />

            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </header>
    );
});
