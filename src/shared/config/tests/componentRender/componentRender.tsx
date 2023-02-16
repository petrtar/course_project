import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nForTest from "shared/config/i18n/i18nForTest";

export interface componentRenderOptions {
  router?: string;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const { router = "/" } = options;
  return render(
    <MemoryRouter initialEntries={[router]}>
      <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
    </MemoryRouter>
  );
}
