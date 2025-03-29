// Types
import { IPotGridProps } from "../props/pot-grid-props";
import { IPotComponentConfig } from "./pot-component-config";

type TConfig<
    TDevice extends string = string,
    TGap extends string = string,
> = IPotComponentConfig<IPotGridProps<TDevice, TGap>>

/** PotGrid */
export interface IPotGridConfig<
    TDevice extends string = string,
    TGap extends string = string,
> extends TConfig<TDevice, TGap> {}