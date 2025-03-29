// Types
// Types
import { IPotGroupProps } from "../props/pot-group-props";
import { IPotKitComponentConfig } from "./pot-component-config";

/** PotGroup */
export interface IPotGroupConfig<
    TDevice extends string = string,
    TGap extends string = string,
> extends IPotKitComponentConfig<IPotGroupProps<TDevice, TGap>> {}