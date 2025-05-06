// Types
import type {
    IPotGridConfig,
    IPotGroupConfig,
    IPotButtonConfig,
    IPotCheckboxConfig,
    IPotInputConfig,
    IPotLinkConfig,
    IPotRadioConfig,
    IPotTooltipConfig,
} from './components';

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

export interface IPotKitConfig<TSize extends string = string> {
    breakpoints?: Record<string, number>;

    size?: TSize[];

    color?: {
        [key: string]: {
            [varName: string]: string;
        };
    };

    radius?: {
        [key: string]: string | number;
    };

    gap?: {
        [key: string]: string | number;
    };

    components?: {
        button?: IPotButtonConfig<TSize>;
        checkbox?: IPotCheckboxConfig<TSize>;
        input?: IPotInputConfig<TSize>;
        link?: IPotLinkConfig<TSize>;
        radio?: IPotRadioConfig<TSize>;
        tooltip?: IPotTooltipConfig<TSize>;
        grid?: IPotGridConfig;
        group?: IPotGroupConfig;
    };
}
