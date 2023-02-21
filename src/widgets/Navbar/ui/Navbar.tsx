import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Modal } from "shared/ui/Modal/Modal";

import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggle = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, [isAuthModal]);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button onClick={onToggle} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
        {t("Войти")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae velit ex unde. Animi architecto, similique debitis eius libero
        maxime veniam recusandae voluptatem minus quasi quam! Aut sapiente nulla dolorem?
      </Modal>
    </div>
  );
};
