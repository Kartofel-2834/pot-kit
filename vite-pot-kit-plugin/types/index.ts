// Types
import { IPotButtonConfig } from "./pot-button-config";
import { IPotCheckboxConfig } from "./pot-checkbox-config";

export * from './pot-component-config';
export * from './pot-button-config';
export * from './pot-checkbox-config';

export interface IPotKitConfig<TSize extends string = string> {
    breakpoints: Record<string, number>;

    size: TSize[];

    color: {
        [colorName: string]: {
            [varName: string]: string;
        } 
    };

    radius: {
        [radiusName: string]: string | number;
    };

    gap: {
        [gapName: string]: string | number;
    };

    components: {
        button: IPotButtonConfig<TSize>;
        checkbox: IPotCheckboxConfig<TSize>;
    }
}





