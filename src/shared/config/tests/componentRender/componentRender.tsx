import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

import i18nForTest from "../../../config/i18n/i18nForTest";

export interface componentRenderOptions {
    router?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {}
) {
    const { router = "/", initialState, asyncReducers } = options;
    return render(
        <MemoryRouter initialEntries={[router]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider i18n={i18nForTest}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}
