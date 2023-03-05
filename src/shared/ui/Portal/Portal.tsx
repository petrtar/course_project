import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PortalProps> = ({ children, element = document.body }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current = document.querySelector("#root") || null;
    setMounted(true);
  }, []);
  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
