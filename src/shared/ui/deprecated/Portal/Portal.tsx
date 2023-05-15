import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
}

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */
export const Portal: FC<PortalProps> = ({ children }) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector("#root") || null;
        setMounted(true);
    }, []);
    return mounted && ref.current ? createPortal(children, ref.current) : null;
};
