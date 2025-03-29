// Types
import { IPotGridProps } from "../props/pot-grid-props";
import { IPotKitComponentConfig } from "./pot-component-config";

/** PotGrid */
export interface IPotGridConfig<
    TDevice extends string = string,
    TGap extends string = string,
> extends IPotKitComponentConfig<IPotGridProps<TDevice, TGap>> {}