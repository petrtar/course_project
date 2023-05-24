import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import cls from "./ProfileCardDeprecated.module.scss";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import { Loader } from "@/shared/ui/deprecated/Loader";
import { Text, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text";

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation("profile");
    return (
        <HStack
            justify='center'
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <Text
                theme={TextTheme.ERROR}
                title={t("Произошла ошибка при загрузке профиля")}
                text={t("Попробуйте обновить страницу")}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            justify='center'
            max
            className={classNames(cls.ProfileCard, {}, [cls.loading])}
        >
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated: FC<ProfileCardProps> = memo((props) => {
    const {
        className,
        data,
        onChangeName,
        onChangeLastName,
        readonly,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation("profile");

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap='8'
            max
            className={classNames(cls.ProfileCardDeprecates, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify='center' max>
                    <AvatarDeprecated src={data.avatar} alt='avatar' />
                </HStack>
            )}
            <InputDeprecated
                value={data?.name}
                placeholder={t("Ваше имя")}
                onChange={onChangeName}
                readonly={readonly}
                data-testid='ProfileCard.firstname'
            />
            <InputDeprecated
                value={data?.lastname}
                placeholder={t("Ваша фамилия")}
                onChange={onChangeLastName}
                readonly={readonly}
                data-testid='ProfileCard.lastname'
            />
            <InputDeprecated
                value={data?.age}
                placeholder={t("Ваша возраст")}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.city}
                placeholder={t("Город")}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.username}
                placeholder={t("Введите имя пользователя")}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <InputDeprecated
                value={data?.avatar}
                placeholder={t("Введите ссылку на аватар")}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});
