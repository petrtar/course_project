import {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readonly?: boolean;
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
        ...otherProps
    }) => {
        const [isFocused, setIsFocused] = useState(false);
        const [caretPosition, setCaretPosition] = useState(0);

        const ref = useRef<HTMLInputElement>(null);

        const isCaredVisible = isFocused && !readonly;

        const onBlur = () => {
            setIsFocused(false);
        };

        const onFocus = () => {
            setIsFocused(true);
        };

        const onSelect = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
            setCaretPosition(e.currentTarget.selectionStart || 0);
        };

        useEffect(() => {
            if (autoFocus) {
                setIsFocused(true);
                ref.current?.focus();
            }
        }, [autoFocus]);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
            setCaretPosition(e.target.value.length);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
        };

        return (
            <div className={classNames(cls.InputWrapper, mods, [className])}>
                {placeholder && (
                    <div className={cls.placeholder}>{`${placeholder} >`}</div>
                )}
                <div className={cls.caretWrapper}>
                    <input
                        ref={ref}
                        type={type}
                        value={value}
                        onChange={onChangeHandler}
                        className={cls.input}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onSelect={onSelect}
                        readOnly={readonly}
                        {...otherProps}
                    />
                    {isCaredVisible && (
                        <span
                            className={cls.caret}
                            style={{ left: `${caretPosition * 9}px` }}
                        />
                    )}
                </div>
            </div>
        );
    }
);
