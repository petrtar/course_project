/* eslint-disable ulbi-tv-plugin/layer-imports */
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";

import i18nForTest from "../../../config/i18n/i18nForTest";
import { ThemeProvider } from "@/app/providers/ThemeProviders";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";

export interface componentRenderOptions {
    router?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider({ children, options = {} }: TestProviderProps) {
    const {
        router = "/",
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;
    return (
        <MemoryRouter initialEntries={[router]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider i18n={i18nForTest}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {}
) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
