import { FC, memo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { NotificationList } from "@/entities/Notification";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Popover } from "@/shared/ui/Popup";

import NotificationIcon from "@/shared/assets/icons/notification.svg";

import { Drawer } from "@/shared/ui/Drawer/Drawer";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    ({ className }) => {
        const [isOpen, setIsOpen] = useState(false);

        const trigger = (
            <Button onClick={() => setIsOpen(true)} theme={ButtonTheme.CLEAR}>
                <Icon Svg={NotificationIcon} inverted />
            </Button>
        );

        return (
            <div>
                <BrowserView>
                    <Popover
                        className={classNames("", {}, [className])}
                        direction='bottom left'
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <NotificationList />
                    </Drawer>
                </MobileView>
            </div>
        );
    }
);
