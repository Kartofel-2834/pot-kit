export type TDependencies = {
    components: string[],
    composables: string[],
    types: string[],
};

export type TPrefix = {
    kebab: string;
    camel: string;
    upper: string;
}

export interface IPotKitJsonConfig {
    /** Использовать для подгрузки стилей и классов собственный сервер pot-kit */
    ownServer: boolean;

    components: string;
    types: string;
    styles: string;
    composables: string;
    imports: Record<string, string>;
    prefix: string;
}
