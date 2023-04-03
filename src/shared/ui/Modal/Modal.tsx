import {
    FC,
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Portal } from "shared/ui/Portal/Portal";
import cls from "./Modal.module.scss";

const ANIMATION_DELAY = 300;

interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") closeHandler();
        },
        [closeHandler]
    );

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
