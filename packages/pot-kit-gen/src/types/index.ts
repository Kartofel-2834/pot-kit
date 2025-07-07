export interface IPrefix {
    kebab: string;
    camel: string;
    upper: string;
}

export interface IGeneratedData {
    type: 'component' | 'style' | 'enum' | 'composable';
    name: string;
    data: string;
    path: string;
}

export type TCondition = {
    selector: string;
    properties: Record<string, string | number>;
};

export type TCharacteristicVariants = Record<string, TCondition>;

export type TCharacteristics = Record<string, TCharacteristicVariants>;

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

export interface IPotKitConfig {
    variables?: Record<string, string | number>;

    breakpoints?: Record<string, number>;

    components?: {
        [name: string]: Record<string, TCharacteristics>;
    };
}
