import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

const AdminPanelPage = () => {
    const { t } = useTranslation();
    return <Page data-testid='AdminPanelPage'>{t("Админ Панель")}</Page>;
};

export default AdminPanelPage;
