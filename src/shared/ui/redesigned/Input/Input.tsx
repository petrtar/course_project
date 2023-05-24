import {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.scss";
import { HStack } from "../Stack";
import { Text } from "../Text";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly" | "size"
>;

type InputSize = "s" | "m" | "l";

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
}

export const Input: FC<InputProps> = memo(
    ({
        className,
        value = "",
        onChange,
        type = "text",
        placeholder,
        autoFocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = "m",
        ...otherProps
    }) => {
        const [isFocused, setIsFocused] = useState(false);

        const ref = useRef<HTMLInputElement>(null);

        const onBlur = () => {
            setIsFocused(false);
        };

        const onFocus = () => {
            setIsFocused(true);
        };

        useEffect(() => {
            if (autoFocus) {
                setIsFocused(true);
                ref.current?.focus();
            }
        }, [autoFocus]);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls.withAddonLeft]: Boolean(addonLeft),
            [cls.withAddonRight]: Boolean(addonRight),
        };

        const input = (
            <div
                className={classNames(cls.InputWrapper, mods, [
                    className,
                    cls[size],
                ])}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    readOnly={readonly}
                    placeholder={placeholder}
                    {...otherProps}
                />
                <div className={cls.addonRight}>{addonRight}</div>
            </div>
        );

        if (label) {
            return (
                <HStack max gap='8'>
                    <Text text={label} />
                    {input}
                </HStack>
            );
        }

        return input;
    }
);
