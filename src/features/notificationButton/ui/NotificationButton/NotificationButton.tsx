import { FC, memo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { NotificationList } from "@/entities/Notification";
import { classNames } from "@/shared/lib/classNames/classNames";

import NotificationIcon from "@/shared/assets/icons/notification.svg";

import cls from "./NotificationButton.module.scss";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { Popover } from "@/shared/ui/deprecated/Popup";
import { Drawer } from "@/shared/ui/deprecated/Drawer";

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
