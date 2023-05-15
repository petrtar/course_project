import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";

import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";
import { Dropdown } from "@/shared/ui/deprecated/Popup";
import { Avatar } from "@/shared/ui/deprecated/Avatar";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) return null;
    return (
        <Dropdown
            className={classNames("", {}, [className])}
            direction='bottom left'
            items={[
                ...(isAdminPanelAvailable
                    ? [
                          {
                              content: t("Админка"),
                              href: getRouteAdminPanel(),
                          },
                      ]
                    : []),
                {
                    content: t("Профиль"),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t("Выйти"),
                    onClick: onLogout,
                },
            ]}
            trigger={
                <Avatar fallbackInverted size={30} src={authData.avatar} />
            }
        />
    );
});
