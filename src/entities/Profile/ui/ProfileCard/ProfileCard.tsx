import { FC } from "react";
import { useTranslation } from "react-i18next";

import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Text, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Country, CountrySelect } from "@/entities/Country";

import { Profile } from "../../model/types/profile";

import cls from "./ProfileCard.module.scss";
import { Loader } from "@/shared/ui/deprecated/Loader";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Input } from "@/shared/ui/deprecated/Input";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = ({
    className,
    data,
    isLoading,
    error,
    onChangeName,
    onChangeLastName,
    readonly,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
}) => {
    const { t } = useTranslation("profile");

    if (isLoading) {
        return (
            <HStack
                justify='center'
                max
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                justify='center'
                max
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t("Произошла ошибка при загрузке профиля")}
                    text={t("Попробуйте обновить страницу")}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap='8'
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify='center' max>
                    <Avatar src={data.avatar} alt='avatar' />
                </HStack>
            )}
            <Input
                value={data?.name}
                placeholder={t("Ваше имя")}
                onChange={onChangeName}
                readonly={readonly}
                data-testid='ProfileCard.firstname'
            />
            <Input
                value={data?.lastname}
                placeholder={t("Ваша фамилия")}
                onChange={onChangeLastName}
                readonly={readonly}
                data-testid='ProfileCard.lastname'
            />
            <Input
                value={data?.age}
                placeholder={t("Ваша возраст")}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t("Город")}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t("Введите имя пользователя")}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
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
};
