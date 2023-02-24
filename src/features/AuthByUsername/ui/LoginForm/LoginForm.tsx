import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";

import { loginActions } from "../../model/slice/loginSlice";
import { getLoginState } from "../../model/selectors/getLoginState.ts/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";

import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { password, username, isLoading, error } = useSelector(getLoginState);

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

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t("Форма авторизации")} />
      {error && <Text text={t("Вы ввели неверный логин или пароль")} theme={TextTheme.ERROR} />}
      <Input onChange={onChangeUsername} autoFocus type="text" placeholder={t("Введите username")} className={cls.input} value={username} />
      <Input onChange={onChangePassword} type="text" placeholder={t("Введите пароль")} className={cls.input} value={password} />
      <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn} onClick={onLoginClick} disabled={isLoading}>
        {t("Войти")}
      </Button>
    </div>
  );
});
