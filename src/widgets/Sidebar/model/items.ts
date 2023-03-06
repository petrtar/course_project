import { RouterPath } from "shared/config/routeConfig/routeConfig";

import AboutIcon from "shared/assets/icons/about.svg";
import MainIcon from "shared/assets/icons/main.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
  {
    path: RouterPath.main,
    text: "Главная",
    Icon: MainIcon,
  },
  {
    path: RouterPath.about,
    text: "О нас",
    Icon: AboutIcon,
  },
  {
    path: RouterPath.profile,
    text: "Профиль",
    Icon: ProfileIcon,
    authOnly: true,
  },
];
