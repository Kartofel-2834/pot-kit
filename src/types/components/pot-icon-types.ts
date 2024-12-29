/**
 * Интерфейс пропсов для компонента PotIcon
 */
export interface IPotIconProps {
    /** Название svg файла без расширения */
    icon: string;

    /** Путь до папки с иконками */
    srcPath?: string;

    /**
     * Размер иконки в ремах * 10
     *
     * @example
     * <PotIcon icon="pot" size="24" /> // Иконка с width и height 2.4rem
     */
    size?: string | number | null;
}
