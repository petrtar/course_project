export type BuildMode = "production" | "development";

export type ProjectType = "storybook" | "frontend" | "jest";

export interface BuildPath {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPath;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: ProjectType;
}
