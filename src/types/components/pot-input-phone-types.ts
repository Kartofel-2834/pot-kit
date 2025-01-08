import type { IPotInputBaseProps } from "./pot-input-base-types";

export interface IPotInputPhoneProps extends Omit<IPotInputBaseProps, 'formatter' | 'parser'> {}