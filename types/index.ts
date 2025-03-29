// Types
import { IPotButtonConfig } from "./config/pot-button-config";
import { IPotCheckboxConfig } from "./config/pot-checkbox-config";
import { IPotGridConfig } from "./config/pot-grid-config";
import { IPotInputConfig } from "./config/pot-input-config";
import { IPotGroupConfig } from "./config/pot-group-config";
import { IPotIconConfig } from "./config/pot-icon-config";

export * from './config/pot-component-config';
export * from './config/pot-button-config';
export * from './config/pot-checkbox-config';
export * from './config/pot-input-config';
export * from './config/pot-grid-config';
export * from './config/pot-group-config';
export * from './config/pot-icon-config';

export interface IPotKitConfig<
    TDevice extends string = string,
    TColor extends string = string,
    TSize extends string = string, 
    TRadius extends string = string,
    TGap extends string = string,
> {
    breakpoints: Record<TDevice, number>;

    size: TSize[];

    color: {
        [key in TColor]: {
            [varName: string]: string;
        };
    };
    
    radius: {
        [key in TRadius]: string | number;
    };
    
    gap: {
        [key in TGap]: string | number;
    }
    
    components: {
        button: IPotButtonConfig<TDevice, TColor, TSize, TRadius>;
        checkbox: IPotCheckboxConfig<TDevice, TColor, TSize, TRadius>;
        input: IPotInputConfig<TDevice, TColor, TSize, TRadius>;
        grid: IPotGridConfig<TDevice, TGap>;
        group: IPotGroupConfig<TDevice, TGap>;
        icon: IPotIconConfig;
    }
}






