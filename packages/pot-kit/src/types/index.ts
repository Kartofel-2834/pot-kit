export type TDependenciesMap = {
    [key in keyof TDependencies]: Record<string, Record<string, string[]>>;
};

export type TDependencies = {
    components: string[];
    composables: string[];
    types: string[];
};

export type IPrefix = {
    kebab: string;
    camel: string;
    upper: string;
};

export interface IPotKitInstallationConfig {
    components: string;
    types: string;
    styles: string;
    composables: string;
    imports: Record<string, string>;
    prefix: string;
    overwrite: boolean;
    potServer: boolean;
}
