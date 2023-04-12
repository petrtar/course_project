import { FC } from "react";
import { useParams } from "react-router-dom";

import { Page } from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack";
import { classNames } from "shared/lib/classNames/classNames";
import { EditableProfileCard } from "features/editableProfileCard";
import { Text } from "shared/ui/Text/Text";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames("", {}, [className])}>
            <VStack gap='16' max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
