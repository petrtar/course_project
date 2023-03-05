import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nForTest from "shared/config/i18n/i18nForTest";

export interface componentRenderOptions {
  router?: string;
  initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const { router = "/", initialState } = options;
  return render(
    <MemoryRouter initialEntries={[router]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}
