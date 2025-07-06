type TPotButtonConditions = 'base' | 'hover' | 'pressed' | 'disabled';

/** PotButton */
export interface IPotButtonConfig {
    color?: {
        [key: string]: {
            [condition in TPotButtonConditions]?: {
                /** Цвет рамки */
                border: string;

                /** Цвет фона */
                background: string;

                /** Цвет текста */
                text: string;

                /** Цвет обводки */
                outline: string;
            };
        };
    };

    size?: {
        [key: string]: {
            /** Высота */
            height: string | number;

            /** Текст */
            text: string | number;

            /** Паддинг */
            padding: string | number;

            /** Размер рамки */
            border: string | number;

            /** Размер обводки */
            outline: string | number;

            /** Отступ рамки от кнопки */
            'outline-offset': string | number;
        };
    };
}
