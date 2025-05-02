/**
 * Пропсы UiIcon
 */
export interface IUiIconProps {
    /** Название иконки */
    icon: string;

    /** Размер иконки в ремах * 10 */
    size?: string | number | null;

    /** Функция подгрузки возвращающая контент иконки в виде строки */
    loader?: (iconName: string) => Promise<string> | string;
}
