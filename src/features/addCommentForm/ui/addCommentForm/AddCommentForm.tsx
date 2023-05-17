import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import {
    addCommentFormActions,
    addCommentFormReducer,
} from "../../model/slices/addCommentFormSlice";

import cls from "./AddCommentForm.module.scss";
import { Input } from "@/shared/ui/deprecated/Input";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";

const reducers: ReducerList = {
    AddCommentForm: addCommentFormReducer,
};

export interface addCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const AddCommentForm: FC<addCommentFormProps> = memo(
    ({ className, onSendComment }) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();

        const text = useSelector(getAddCommentFormText);

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch]
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text || "");
            onCommentTextChange("");
        }, [onSendComment, onCommentTextChange, text]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <HStack
                    data-testid='AddCommentForm'
                    justify='between'
                    max
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <Input
                        data-testid='AddCommentForm.Input'
                        placeholder={t("Введите текст комментария")}
                        value={text}
                        onChange={onCommentTextChange}
                        className={cls.input}
                    />
                    <Button
                        data-testid='AddCommentForm.Button'
                        theme={ButtonTheme.OUTLINE}
                        onClick={onSendHandler}
                    >
                        {t("Отправить")}
                    </Button>
                </HStack>
            </DynamicModuleLoader>
        );
    }
);

export default AddCommentForm;
