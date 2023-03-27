import { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateSchema) => state.AddCommentForm?.text ?? "";
export const addAddCommentFormError = (state: StateSchema) => state.AddCommentForm?.error;
