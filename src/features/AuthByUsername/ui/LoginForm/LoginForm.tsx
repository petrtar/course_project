import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Text, TextTheme } from "@/shared/ui/Text";
import {
    DynamicModuleLoader,
    ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";

import cls from "./LoginForm.module.scss";

const InitialReducers: ReducerList = {
    loginForm: loginReducer,
};

export interface LoginFormProps {
    onSuccess: () => void;
    className?: string;
}

const LoginForm: FC<LoginFormProps> = memo(({ onSuccess, className }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    }, [onSuccess, dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={InitialReducers} removeAfterUnmount>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t("Форма авторизации")} />
                {error && (
                    <Text
                        text={t("Вы ввели неверный логин или пароль")}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    onChange={onChangeUsername}
                    autoFocus
                    type='text'
                    placeholder={t("Введите username")}
                    className={cls.input}
                    value={username}
                />
                <Input
                    onChange={onChangePassword}
                    type='text'
                    placeholder={t("Введите пароль")}
                    className={cls.input}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t("Войти")}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
