import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { updateFeatureFlagsMutation } from "../api/featureFlagsApi";
import { getAllFeatureFlags, setFeatureFlags } from "../lib/useGetFeatures";

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>("features/updateFeatureFlag", async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const addFeatures = {
        ...getAllFeatureFlags(),
        ...newFeatures,
    };

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: addFeatures,
            })
        );

        setFeatureFlags(addFeatures);
        window.location.reload();
        return undefined;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return rejectWithValue("");
    }
});
