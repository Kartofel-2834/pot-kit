// Enums
import { EIcon } from "@/enums/config";

/**
 * Интерфейс пропсов для компонента PotIcon
 */
export interface IPotIconProps {
    /** Название svg файла без расширения */
    icon: EIcon;

    /**
     * Размер иконки в ремах * 10
     *
     * @example
     * <PotIcon icon="pot" size="24" /> // Иконка с width и height 2.4rem
     */
    size?: string | number | null;


    /**
     * Функция подгрузки возвращающая файл иконки в виде строки
     */
    loader?: (iconName: string) => Promise<string>;
}
