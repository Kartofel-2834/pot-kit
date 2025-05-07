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

export interface IPotKitConfig<
    TSize extends string = string,
    TColorTheme extends { [varName: string]: string } = { [varName: string]: string },
> {
    size?: TSize[];

    color?: {
        [key: string]: TColorTheme;
    };

    variables?: Record<string, string | number>;

    breakpoints?: Record<string, number>;

    radius?: Record<string, string | number>;

    gap?: Record<string, string | number>;

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
