import { FC } from "react";

import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;

/**
 * Устарел, используем новый компонент из папки redesigned
 * @deprecated
 */

export const VStack: FC<VStackProps> = (props) => {
    const { align = "start" } = props;
    return <Flex direction='column' align={align} {...props} />;
};
