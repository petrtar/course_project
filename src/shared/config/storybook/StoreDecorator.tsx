import { Story } from "@storybook/react";

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { addCommentFormReducer } from "@/features/addCommentForm/testing";
import { loginReducer } from "@/features/AuthByUsername/testing";
import { profileReducer } from "@/features/editableProfileCard/testing";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/testing";
import { ReducerList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducerList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    AddCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) =>
    (StoryComponent: Story) => {
        return (
            <StoreProvider
                initialState={state}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <StoryComponent />
            </StoreProvider>
        );
    };
