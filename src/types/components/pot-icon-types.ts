/**
 * Интерфейс пропсов для компонента PotIcon
 *
 * @property {string} [icon] - Название svg файла без расширения.
 * @property {string} [srcPath] - Путь до папки с иконками.
 * @property {string | number | null} [size] - Размер иконки в ремах * 10
 *
 * @example
 * <PotIcon icon="pot" size="24" /> // Иконка с width и height 2.4rem
 */
export interface IPotIconProps {
    icon: string;
    srcPath?: string;
    size?: string | number | null;
}
