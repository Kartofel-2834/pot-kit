/** Общие для компонентов типы */
type TPotSafeAlignment<T extends string> = `${'safe' | 'unsafe'} ${T}`;

type TPotJustifyKeys =
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'flex-start'
    | 'end'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

type TPotJustifyItemsKeys = TPotJustifyKeys | 'self-start' | 'self-end' | 'anchor-center';

type TPotAlignKeys =
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'flex-start'
    | 'end'
    | 'flex-end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline';

type TPotAlignContentKeys = TPotAlignKeys | 'space-between' | 'space-around' | 'space-evenly';

export type TPotGroupDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type TPotGroupWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type TPotJustify =
    | TPotJustifyKeys
    | TPotSafeAlignment<TPotJustifyKeys>
    | `legacy ${TPotJustifyKeys}`;

export type TPotJustifyItems =
    | TPotJustifyItemsKeys
    | TPotSafeAlignment<TPotJustifyItemsKeys>
    | `legacy ${TPotJustifyItemsKeys}`;

export type TPotAlign = TPotAlignKeys | TPotSafeAlignment<TPotAlignKeys>;

export type TPotAlignContent = TPotAlignContentKeys | TPotSafeAlignment<TPotAlignContentKeys>;