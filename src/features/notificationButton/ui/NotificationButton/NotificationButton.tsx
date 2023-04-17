import { NotificationList } from "entities/Notification";
import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { Popover } from "shared/ui/Popup";

import NotificationIcon from "shared/assets/icons/notification.svg";

import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    ({ className }) => {
        return (
            <Popover
                className={classNames("", {}, [className])}
                direction='bottom left'
                trigger={
                    <Button theme={ButtonTheme.CLEAR}>
                        <Icon Svg={NotificationIcon} inverted />
                    </Button>
                }
            >
                <NotificationList className={cls.notifications} />
            </Popover>
        );
    }
);
