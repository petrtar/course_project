import { createReduxStore, AppDispatch } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type {
    StateSchema,
    ReduxStoreWithManager,
    ThunkExtraArg,
    ThunkConfig,
    StateSchemaKey,
} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    ReduxStoreWithManager,
    ThunkExtraArg,
};

export type { AppDispatch, StateSchema, ThunkConfig, StateSchemaKey };
