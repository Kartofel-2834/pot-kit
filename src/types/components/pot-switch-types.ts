// Types
import type { TCheckboxValue } from "./pot-checkbox-types";

// Enums
import type { ERadius, ESize } from "@/enums/components";
import type { EDevice, EColorTheme, EIcon } from "@/enums/config";

export interface IPotSwitchProps {
    /** Текущее значение чекбокса */
    value?: TCheckboxValue;

    /** Текущее значение чекбокса */
    modelValue?: TCheckboxValue;

    /** Если чекбокс в состоянии checked, то value = trueValue */
    trueValue?: TCheckboxValue;

    /** Если чекбокс не в состоянии checked, то value = falseValue */
    falseValue?: TCheckboxValue;

    /** Если true, то чекбокс будет задизейблен */
    disabled?: boolean;

    /** Иконка в чекбоксе, галочка по-умолчанию */
    icon?: EIcon | null;

    /** Цвет чекбокса */
    color?: EColorTheme | EColorTheme[];

    /** Размер чекбокса, null для скейла от шрифта */
    size?: ESize | ESize[] | null;

    /** Радиус границ чекбокса */
    radius?: ERadius | ERadius[] | null;

    /** Точки останова для адаптивного дизайна */
    devices?: EDevice[];
}
