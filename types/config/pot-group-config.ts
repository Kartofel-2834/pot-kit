// Types
import { IPotGroupProps } from "../props/pot-group-props";
import { IPotComponentConfig } from "./pot-component-config";

type TConfig<
    TDevice extends string = string,
    TGap extends string = string,
> = IPotComponentConfig<IPotGroupProps<TDevice, TGap>>;

/** PotGroup */
export interface IPotGroupConfig<
    TDevice extends string = string,
    TGap extends string = string,
> extends TConfig<TDevice, TGap> {}