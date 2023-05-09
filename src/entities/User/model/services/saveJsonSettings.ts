import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/app/providers/StoreProvider";
import { JsonSettings } from "../types/jsonSettings";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../selectors/jsonSettings";
import { setJsonSettingsMutations } from "../../api/userApi";

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>("user/saveJsonSettings", async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue("user data is empty");
    }

    try {
        const response = await dispatch(
            setJsonSettingsMutations({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            })
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue("jsonSettings data is empty");
        }

        return response.jsonSettings;
    } catch (e) {
        return rejectWithValue("error");
    }
});
