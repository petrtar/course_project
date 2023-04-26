import { FC, useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";

//  Компонент для тестирования
export const BugButton: FC = () => {
    const [error, setError] = useState<boolean>(false);

    const onThrow = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) throw new Error();
    });

    // eslint-disable-next-line i18next/no-literal-string
    return <Button onClick={onThrow}>throw error</Button>;
};
