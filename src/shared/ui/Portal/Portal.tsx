import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PortalProps> = ({ children, element = document.body }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#root") || undefined;
    setMounted(true);
  }, []);
  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
