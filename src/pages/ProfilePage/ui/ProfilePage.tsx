import { FC } from "react";
import { useParams } from "react-router-dom";

import { Page } from "@/widgets/Page";
import { classNames } from "@/shared/lib/classNames/classNames";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { VStack } from "@/shared/ui/redesigned/Stack";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid='ProfilePage'
            className={classNames("", {}, [className])}
        >
            <VStack gap='16' max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
