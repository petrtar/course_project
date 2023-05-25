import { FC, memo, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { NotificationList } from "@/entities/Notification";
import { classNames } from "@/shared/lib/classNames/classNames";

import NotificationIconDeprecated from "@/shared/assets/icons/notification.svg";
import NotificationIcon from "@/shared/assets/icons/notify.svg";

import cls from "./NotificationButton.module.scss";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { ToggleFeatures } from "@/shared/lib/features";
import { Popover as PopoverDerpecated } from "@/shared/ui/deprecated/Popup";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Popover } from "@/shared/ui/redesigned/Popup";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    ({ className }) => {
        const [isOpen, setIsOpen] = useState(false);

        const trigger = (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Icon
                        Svg={NotificationIcon}
                        clickable
                        onClick={() => setIsOpen(true)}
                    />
                }
                off={
                    <ButtonDeprecated
                        onClick={() => setIsOpen(true)}
                        theme={ButtonTheme.CLEAR}
                    >
                        <IconDeprecated
                            Svg={NotificationIconDeprecated}
                            inverted
                        />
                    </ButtonDeprecated>
                }
            />
        );

        return (
            <div>
                <BrowserView>
                    <ToggleFeatures
                        feature='isAppRedesigned'
                        on={
                            <Popover
                                className={classNames("", {}, [className])}
                                direction='bottom left'
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </Popover>
                        }
                        off={
                            <PopoverDerpecated
                                className={classNames("", {}, [className])}
                                direction='bottom left'
                                trigger={trigger}
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </PopoverDerpecated>
                        }
                    />
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
