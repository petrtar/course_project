import { FC, memo, useCallback } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import ThemeIconDeprecated from "@/shared/assets/icons/theme-light.svg";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { saveJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon";
import ThemeIcon from "@/shared/assets/icons/swap-theme-default.svg";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme: Theme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={<Icon Svg={ThemeIcon} onClick={onToggleHandler} clickable />}
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={classNames("", {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </ButtonDeprecated>
            }
        />
    );
});
