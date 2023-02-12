import { FC, useEffect, useState } from "react";
import { Button } from "shared/ui/Button/Button";

//  Компонент для тестирования
export const BugButton: FC = () => {
  const [error, setError] = useState<boolean>(false);

  const onThrow = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) throw new Error();
  });

  return <Button onClick={onThrow}>throw error</Button>;
};
