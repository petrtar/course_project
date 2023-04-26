import { RouteProps } from "react-router-dom";
import { UserRole } from "@/entities/User";

export type AppRoutersProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
