export type TDependencies = {
    components: string[];
    composables: string[];
    types: string[];
};

export type TPrefix = {
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
    options: {
        prefix: string;
        overwrite: boolean;
        potServer: boolean;
    };
}
