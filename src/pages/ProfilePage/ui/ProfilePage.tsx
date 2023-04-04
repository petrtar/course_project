import { useSelector } from "react-redux";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    getProfileForm,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
    getProfileValidateErrors,
    ValidateProfileError,
} from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { Page } from "widgets/Page/Page";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";

import { VStack } from "shared/ui/Stack";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: ReducerList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t(
            "Серверная ошибка при сохранении"
        ),
        [ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректный регион"),
        [ValidateProfileError.NO_DATA]: t("Данные не указаны"),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            "Имя и фамилия обязательны"
        ),
        [ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
    };

    useInitialEffect(() => {
        if (id) dispatch(fetchProfileData(id));
    });

    const onChangeName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ name: value || "" }));
        },
        [dispatch]
    );

    const onChangeLastName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || "" }));
        },
        [dispatch]
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            const age = value ? value.replace(/[^0-9]/g, "") : 0;
            dispatch(profileActions.updateProfile({ age: Number(age) }));
        },
        [dispatch]
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || "" }));
        },
        [dispatch]
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || "" }));
        },
        [dispatch]
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || "" }));
        },
        [dispatch]
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch]
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch]
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <VStack gap='16' max>
                    <ProfilePageHeader />
                    {validateErrors?.length &&
                        validateErrors.map((err) => (
                            <Text
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslates[err]}
                                key={err}
                            />
                        ))}
                    <VStack max className={classNames("", {}, [className])}>
                        <ProfileCard
                            data={formData}
                            isLoading={isLoading}
                            error={error}
                            onChangeName={onChangeName}
                            onChangeLastName={onChangeLastName}
                            readonly={readonly}
                            onChangeAge={onChangeAge}
                            onChangeCity={onChangeCity}
                            onChangeUsername={onChangeUsername}
                            onChangeAvatar={onChangeAvatar}
                            onChangeCurrency={onChangeCurrency}
                            onChangeCountry={onChangeCountry}
                        />
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
