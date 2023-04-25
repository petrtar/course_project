import { Story } from "@storybook/react";

// TODO
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { addCommentFormReducer } from "@/features/addCommentForm/model/slices/addCommentFormSlice";
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { loginReducer } from "@/features/AuthByUsername/model/slice/loginSlice";
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { profileReducer } from "@/features/editableProfileCard/model/slice/ProfileSlice";
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/model/slices";
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
