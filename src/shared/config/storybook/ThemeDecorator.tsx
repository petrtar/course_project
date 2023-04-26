import { Story } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProviders";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
