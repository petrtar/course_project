import { ReactElement } from "react";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "../useGetFeatures";

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures = ({ on, off, feature }: ToggleFeaturesProps) => {
    if (getFeatureFlags(feature)) {
        return on;
    }

    return off;
};
