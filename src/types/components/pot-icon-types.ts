/**
 * Интерфейс пропсов для компонента PotIcon
 */
export interface IPotIconProps {
    /** Название иконки */
    icon: string;

    /**
     * Размер иконки в ремах * 10
     *
     * @example
     * <PotIcon icon="pot" size="24" /> // Иконка с width и height 2.4rem
     */
    size?: string | number | null;


    /**
     * Функция подгрузки возвращающая контент иконки в виде строки
     */
    loader?: (iconName: string) => Promise<string> | string;
}
