<template>
    <render />

    <Teleport :to="to">
        <Transition :name="properties.value.transition ?? undefined">
            <div
                v-if="persistent || isVisible"
                v-show="isVisible"
                ref="tooltipRef"
                :class="[$style.PotTooltip, 'pot-tooltip', classList]"
                :style="{ transform: `translate(${x}px, ${y}px)` }"
                v-bind="$attrs"
                v-on="$attrs"
                @mouseover="clearCloseTimeout"
                @mouseout="close"
            >
                <slot
                    name="tooltip"
                    :visible="isVisible"
                >
                    <div :class="[$style.wrapper, 'pot-tooltip__wrapper']">
                        <slot
                            name="content"
                            :visible="isVisible"
                        >
                            {{ text }}
                        </slot>
                    </div>
                </slot>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
// Types
import type { VNode, RendererElement } from 'vue';

// Enums
import { ESize } from '@/enums/config';
import { ERadius, ETooltipPosition } from '@/enums/components';

// Vue
import { ref, cloneVNode, watch, computed, shallowRef } from 'vue';

// Composables
import { useResizeObserver } from '@/composables/resize';
import { EColorTheme, EDevice } from '@/enums/config';
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

interface IPotTooltipProps {
    visible?: boolean;
    to?: string | RendererElement | null;
    target?: HTMLElement | null;
    closeDelay?: number;
    fixed?: boolean;
    persistent?: boolean;
    text?: string;

    position?: ETooltipPosition | ETooltipPosition[];
    size?: ESize | ESize[];
    color?: EColorTheme | EColorTheme[];
    radius?: ERadius | ERadius[] | null;
    devices?: EDevice[];
    transition?: string | string[] | null;
    offset?: number | number[];
    screenOffset?: number | number[];
}

const emptyRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
} as DOMRect;

const xOppositePositions: Record<ETooltipPosition, ETooltipPosition | null> = {
    [ETooltipPosition.TOP_START]: ETooltipPosition.TOP_END,
    [ETooltipPosition.TOP_END]: ETooltipPosition.TOP_START,
    [ETooltipPosition.TOP_CENTER]: null,

    [ETooltipPosition.BOTTOM_START]: ETooltipPosition.BOTTOM_END,
    [ETooltipPosition.BOTTOM_END]: ETooltipPosition.BOTTOM_START,
    [ETooltipPosition.BOTTOM_CENTER]: null,

    [ETooltipPosition.LEFT_START]: ETooltipPosition.RIGHT_START,
    [ETooltipPosition.LEFT_END]: ETooltipPosition.RIGHT_END,
    [ETooltipPosition.LEFT_CENTER]: ETooltipPosition.RIGHT_CENTER,

    [ETooltipPosition.RIGHT_START]: ETooltipPosition.LEFT_START,
    [ETooltipPosition.RIGHT_END]: ETooltipPosition.LEFT_END,
    [ETooltipPosition.RIGHT_CENTER]: ETooltipPosition.LEFT_CENTER,
};

const yOppositePositions: Record<ETooltipPosition, ETooltipPosition | null> = {
    [ETooltipPosition.TOP_START]: ETooltipPosition.BOTTOM_START,
    [ETooltipPosition.TOP_END]: ETooltipPosition.BOTTOM_END,
    [ETooltipPosition.TOP_CENTER]: ETooltipPosition.BOTTOM_CENTER,

    [ETooltipPosition.BOTTOM_START]: ETooltipPosition.TOP_START,
    [ETooltipPosition.BOTTOM_END]: ETooltipPosition.TOP_END,
    [ETooltipPosition.BOTTOM_CENTER]: ETooltipPosition.TOP_CENTER,

    [ETooltipPosition.LEFT_START]: null,
    [ETooltipPosition.LEFT_END]: null,
    [ETooltipPosition.LEFT_CENTER]: null,

    [ETooltipPosition.RIGHT_START]: null,
    [ETooltipPosition.RIGHT_END]: null,
    [ETooltipPosition.RIGHT_CENTER]: null,
};

const $props = withDefaults(defineProps<IPotTooltipProps>(), {
    visible: undefined,
    to: '#pot-modal-lay',
    target: null,
    offset: 12,
    screenOffset: 12,
    closeDelay: 300,
    transition: 'fade',
    text: '',
    fixed: false,
    persistent: false,
    devices: () => ALL_DEVICES_REVERSED,
    position: ETooltipPosition.TOP_CENTER,
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    radius: ERadius.MEDIUM,
});

const $emit = defineEmits<{
    open: [];
    close: [];
}>();

const $slots = defineSlots<{
    default: () => VNode[];
    content: () => VNode[];
}>();

const x = ref<number>(0);
const y = ref<number>(0);

const isOpen = ref<boolean>(false);
const closeTimeoutId = ref<number>(0);

const tooltipRef = ref<HTMLElement | null>(null);
const targetRef = ref<HTMLElement | null>(null);

const targetSizes = shallowRef<DOMRect>({ ...emptyRect });
const tooltipSizes = shallowRef<DOMRect>({ ...emptyRect });

const tooltipResizeObserver = useResizeObserver({ onProgress: refresh });
const targetResizeObserver = useResizeObserver({ onProgress: refresh });

// Render function
function render() {
    if (!$slots.default) {
        return null;
    }

    let defaultSlotVNodes = $slots.default();

    if (!defaultSlotVNodes.length) {
        return null;
    }

    let targetId: number = NaN;

    // Используем первый вмонтированный VNode в качестве цели, к которой мы прикрепим тултип
    defaultSlotVNodes = defaultSlotVNodes.map((currentVNode, index) =>
        cloneVNode(currentVNode, {
            onVnodeMounted(vnode) {
                if (isNaN(targetId) && vnode.el) {
                    targetRef.value = vnode.el as HTMLElement;
                    targetId = index;
                }
            },

            onVnodeUnmounted() {
                if (targetId === index) {
                    targetRef.value = null;
                }
            },
        }),
    );

    return defaultSlotVNodes;
}

// Computed
const currentTarget = computed<HTMLElement | null>(() => $props.target ?? targetRef.value);

const isVisible = computed<boolean>(() => $props.visible ?? isOpen.value);

const properties = computed(() => {
    return useDeviceProperties(
        {
            position: $props.position,
            color: $props.color,
            size: $props.size,
            radius: $props.radius,
            transition: $props.transition,
            offset: $props.offset,
            screenOffset: $props.screenOffset,
        },
        $props.devices,
    );
});

const classList = computed(() => useClassList(properties.value.value));

// Watchers
watch(
    () => tooltipRef.value,
    newTooltip => {
        tooltipResizeObserver.disconnect();

        if (newTooltip) {
            tooltipResizeObserver.observe(newTooltip);
        }
    },
    {
        immediate: true,
    },
);

watch(
    () => currentTarget.value,
    (newTarget, oldTarget) => {
        if (oldTarget) {
            oldTarget.removeEventListener('mouseover', open);
            oldTarget.removeEventListener('mouseout', close);
        }

        if (newTarget) {
            newTarget.addEventListener('mouseover', open);
            newTarget.addEventListener('mouseout', close);
        }
    },
    { immediate: true },
);

watch(
    () => isVisible.value,
    newValue => {
        if (newValue === true) {
            setupListeners();
            updateSizes();
            $emit('open');
        } else if (newValue === false) {
            removeListeners();
            $emit('close');
        }
    },
    { immediate: true },
);

watch(() => properties.value.value.offset, refresh);
watch(() => properties.value.value.screenOffset, refresh);
watch(() => properties.value.value.position, refresh);

// Methods
function setupListeners() {
    window.addEventListener('scroll', refresh);
    window.addEventListener('resize', refresh);

    if (currentTarget.value) {
        targetResizeObserver.observe(currentTarget.value);
    }
}

function removeListeners() {
    window.removeEventListener('scroll', refresh);
    window.removeEventListener('resize', refresh);
    targetResizeObserver.disconnect();
    tooltipResizeObserver.disconnect();
}

function open() {
    isOpen.value = true;
    clearCloseTimeout();
}

function close() {
    closeTimeoutId.value = setTimeout(() => {
        isOpen.value = false;
        clearCloseTimeout();
    }, $props.closeDelay);
}

function clearCloseTimeout() {
    clearInterval(closeTimeoutId.value);
    closeTimeoutId.value = NaN;
}

function refresh() {
    if (isVisible.value) {
        updateSizes();
    }
}

function updateSizes() {
    updateTargetSizes();
    updateTooltipSizes();
    calculatePosition();
}

function updateTooltipSizes() {
    if (tooltipRef.value) {
        tooltipSizes.value = tooltipRef.value.getBoundingClientRect() as DOMRect;
    }
}

function updateTargetSizes() {
    if (currentTarget.value) {
        targetSizes.value = currentTarget.value.getBoundingClientRect() as DOMRect;
    }
}

/* --- TOOLTIP POSITION CALCULATIONS - START --- */
function calculatePosition() {
    calculateX();
    calculateY();
}

function calculateX() {
    const currentPosition = properties.value.value.position;

    if (!currentPosition) {
        close();
        return;
    }

    x.value = calculateLimitedX(currentPosition) + window.scrollX;
}

function calculateY() {
    const currentPosition = properties.value.value.position;

    if (!currentPosition) {
        close();
        return;
    }

    y.value = calculateLimitedY(currentPosition) + window.scrollY;
}

function calculateLimitedX(somePosition: ETooltipPosition): number {
    const xPosition = calculateXForPosition(somePosition);
    const oppositeSide = xOppositePositions[somePosition];

    if ($props.fixed || !oppositeSide) {
        return xPosition;
    }

    const { width: tooltipWidth } = tooltipSizes.value;

    const screenOffset = properties.value.value.screenOffset || 0;
    const leftLimit = screenOffset;
    const rightLimit = window.innerWidth - tooltipWidth - screenOffset;

    // Если тултип заходит за ЛЕВЫЙ край экрана, пробуем перенести его на другую сторону
    if (xPosition < leftLimit) {
        const xOpposite = calculateXForPosition(oppositeSide);
        return Math.max(xOpposite, xPosition);
    }

    // Если тултип заходит за ПРАВЫЙ край экрана, пробуем перенести его на другую сторону
    if (xPosition > rightLimit) {
        const xOpposite = calculateXForPosition(oppositeSide);
        return Math.min(xOpposite, xPosition);
    }

    return xPosition;
}

function calculateLimitedY(somePosition: ETooltipPosition): number {
    if ($props.fixed) {
        return calculateYForPosition(somePosition);
    }

    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    const yPosition = calculateYForPosition(somePosition);
    const oppositeSide = yOppositePositions[somePosition];

    const screenOffset = properties.value.value.screenOffset || 0;
    const topLimit = screenOffset;
    const bottomLimit = window.innerHeight - tooltipHeight - screenOffset;

    // Если тултип заходит за ВЕРХНИЙ край экрана,
    // то пробуем перенести его на другую сторону
    if (yPosition < topLimit && oppositeSide) {
        const yOpposite = calculateYForPosition(oppositeSide);
        return Math.max(yOpposite, yPosition);
    }

    // Если тултип заходит за ВЕРХНИЙ край экрана и его некуда переносить,
    // то пробуем имитировать sticky поведение
    if (yPosition < topLimit && !oppositeSide) {
        return Math.min(Math.max(yPosition, topLimit), targetY + targetHeight - tooltipHeight);
    }

    // Если тултип заходит за НИЖНИЙ край экрана,
    // то пробуем перенести его на другую сторону
    if (yPosition > bottomLimit && oppositeSide) {
        const yOpposite = calculateYForPosition(oppositeSide);
        return Math.min(yOpposite, yPosition);
    }

    // Если тултип заходит за НИЖНИЙ край экрана и его некуда переносить,
    // то пробуем имитировать sticky поведение
    if (yPosition < topLimit && !oppositeSide) {
        return Math.max(Math.min(yPosition, bottomLimit), targetY);
    }

    return yPosition;
}

function calculateXForPosition(somePosition: ETooltipPosition): number {
    const { x: targetX, width: targetWidth } = targetSizes.value;
    const { width: tooltipWidth } = tooltipSizes.value;

    switch (somePosition) {
        case ETooltipPosition.TOP_CENTER:
        case ETooltipPosition.BOTTOM_CENTER:
            return targetX + targetWidth / 2 - tooltipWidth / 2;

        case ETooltipPosition.TOP_START:
        case ETooltipPosition.BOTTOM_START:
            return targetX;

        case ETooltipPosition.TOP_END:
        case ETooltipPosition.BOTTOM_END:
            return targetX + targetWidth - tooltipWidth;

        case ETooltipPosition.RIGHT_END:
        case ETooltipPosition.RIGHT_START:
        case ETooltipPosition.RIGHT_CENTER:
            return targetX + targetWidth + (properties.value.value.offset || 0);

        case ETooltipPosition.LEFT_END:
        case ETooltipPosition.LEFT_START:
        case ETooltipPosition.LEFT_CENTER:
            return targetX - tooltipWidth - (properties.value.value.offset || 0);
    }
}

function calculateYForPosition(somePosition: ETooltipPosition): number {
    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    switch (somePosition) {
        case ETooltipPosition.TOP_START:
        case ETooltipPosition.TOP_END:
        case ETooltipPosition.TOP_CENTER:
            return targetY - tooltipHeight - (properties.value.value.offset || 0);

        case ETooltipPosition.BOTTOM_START:
        case ETooltipPosition.BOTTOM_END:
        case ETooltipPosition.BOTTOM_CENTER:
            return targetY + targetHeight + (properties.value.value.offset || 0);

        case ETooltipPosition.RIGHT_START:
        case ETooltipPosition.LEFT_START:
            return targetY;

        case ETooltipPosition.RIGHT_END:
        case ETooltipPosition.LEFT_END:
            return targetY + targetHeight - tooltipHeight;

        case ETooltipPosition.RIGHT_CENTER:
        case ETooltipPosition.LEFT_CENTER:
            return targetY + targetHeight / 2 - tooltipHeight / 2;
    }
}
/* --- TOOLTIP POSITION CALCULATIONS - END --- */
</script>

<style lang="scss" module>
.PotTooltip {
    position: absolute;

    /* --- Colors - START --- */
    .wrapper {
        box-shadow: var(--pot-tooltip-shadow);
        background-color: var(--pot-tooltip-background-color);
        color: var(--pot-tooltip-text-color);
    }
    /* --- Colors - END --- */

    /* --- Sizes --- */
    $standard-size: (
        padding: var(--pot-tooltip-size-padding),
        text: var(--pot-tooltip-size-text),
    );

    @include size($standard-size) using ($size, $size-name) {
        .wrapper {
            padding: map-get($size, 'padding');
            font-size: map-get($size, 'text');
        }
    }

    /* --- Radius --- */
    @include radius('.wrapper');
}
</style>
