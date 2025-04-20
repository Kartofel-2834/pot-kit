export type TComponentDependencies = {
    components: string[],
    composables: string[],
    types: string[],
};

export type TComposableDependencies = {
    types: string[],
};

export interface IPotKitJsonConfig {
    /** Использовать для подгрузки стилей и классов собственный сервер pot-kit */
    ownServer: boolean;

    components: string;
    types: string;
    styles: string;
    composables: string;
    imports: Record<string, string>;
}
