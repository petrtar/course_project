import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";

const AdminPanelPage = () => {
    const { t } = useTranslation();
    return <Page>{t("Админ Панель")}</Page>;
};

export default AdminPanelPage;
