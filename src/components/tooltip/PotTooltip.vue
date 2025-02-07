<template>
    <render />

    <Teleport :to="to">
        <Transition :name="transition">
            <div
                v-if="isVisible"
                v-tooltip-resize
                ref="tooltipRef"
                :class="[$style.PotTooltip, 'pot-tooltip']"
                :style="{ transform: `translate(${x}px, ${y}px)` }"
                v-bind="$attrs"
                @mouseover="open"
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
                        />
                    </div>
                </slot>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
// Types
import type { VNode, RendererNode, RendererElement } from 'vue';

// Enums
import { ETooltipPosition } from '@/enums/components';

// Vue
import { ref, cloneVNode, watch, computed, onMounted, onUnmounted } from 'vue';

// Composables
import { getResizeObserver, useResize } from '@/composables/resize';

interface IPotTooltipProps {
    visible?: boolean;
    to?: string | RendererElement | null;
    position?: ETooltipPosition;
    offset?: number;
    screenOffset?: number;
    closeDelay?: number;
    transition: string;
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
    to: '#pot-modal-lay',
    offset: 12,
    screenOffset: 12,
    position: ETooltipPosition.TOP_CENTER,
    visible: undefined,
    closeDelay: 100,
    transition: 'fade',
});

const $slots = defineSlots<{
    default: () => VNode[];
    content: () => VNode[];
}>();

const x = ref<number>(0);
const y = ref<number>(0);

const isOpen = ref<boolean>(false);
const closeTimeoutId = ref<number>(0);

const targetRef = ref<RendererNode | null>(null);
const tooltipRef = ref<Element | null>(null);

const targetSizes = ref<DOMRect>({ ...emptyRect });
const tooltipSizes = ref<DOMRect>({ ...emptyRect });

const vTooltipResize = useResize({ onProgress: refresh });
const targetResizeObserver = getResizeObserver({ onProgress: refresh });

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
                    targetRef.value = vnode.el;
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

// Lifecycle hooks
onMounted(setupListeners);

onUnmounted(removeListeners);

// Computed
const isVisible = computed<boolean>(() => $props.visible ?? isOpen.value);

// Watchers
watch(
    () => targetRef.value,
    newTarget => {
        if (!newTarget) {
            targetResizeObserver.disconnect();
            return;
        }

        targetResizeObserver.observe(newTarget as Element);
    },
);

watch(() => $props.offset, refresh);
watch(() => $props.screenOffset, refresh);
watch(() => $props.position, refresh);
watch(
    () => isVisible.value,
    newValue => {
        if (newValue) {
            updateSizes();
        }
    },
);

// Methods
function refresh() {
    if (isVisible.value) {
        updateSizes();
    }
}

function setupListeners() {
    window.addEventListener('scroll', refresh);
    window.addEventListener('resize', refresh);

    if (targetRef.value) {
        targetRef.value.addEventListener('mouseover', open);
        targetRef.value.addEventListener('mouseout', close);
    }
}

function removeListeners() {
    window.removeEventListener('scroll', refresh);
    window.removeEventListener('resize', refresh);

    if (targetRef.value) {
        targetRef.value.removeEventListener('mouseover', open);
        targetRef.value.removeEventListener('mouseout', close);
    }
}

function open() {
    clearInterval(closeTimeoutId.value);
    closeTimeoutId.value = NaN;
    isOpen.value = true;
}

function close() {
    closeTimeoutId.value = setTimeout(() => (isOpen.value = false), $props.closeDelay);
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
    if (targetRef.value) {
        targetSizes.value = targetRef.value.getBoundingClientRect() as DOMRect;
    }
}

function calculatePosition() {
    calculateX();
    calculateY();
}

function calculateX() {
    const { width: tooltipWidth } = tooltipSizes.value;
    const oppositeSide = xOppositePositions[$props.position];

    let xPosition = calculateXForPosition($props.position);
    const leftLimit = $props.screenOffset;
    const rightLimit = window.innerWidth - tooltipWidth - $props.screenOffset;

    if (xPosition < leftLimit && oppositeSide) {
        // Если тултип заходит за ЛЕВЫЙ край экрана, пробуем перенести его на другую сторону
        const xOpposite = calculateXForPosition(oppositeSide);
        xPosition = Math.max(xOpposite, xPosition);
    } else if (xPosition > rightLimit && oppositeSide) {
        // Если тултип заходит за ПРАВЫЙ край экрана, пробуем перенести его на другую сторону
        const xOpposite = calculateXForPosition(oppositeSide);
        xPosition = Math.min(xOpposite, xPosition); //  xOpposite + tooltipWidth < window.innerWidth ? xOpposite : xPosition;
    }

    x.value = xPosition + window.scrollX;
}

function calculateY() {
    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;
    const oppositeSide = yOppositePositions[$props.position];

    let yPosition = calculateYForPosition($props.position);

    const topLimit = $props.screenOffset;
    const bottomLimit = window.innerHeight - tooltipHeight - $props.screenOffset;

    if (yPosition < topLimit) {
        // Если тултип заходит за ВЕРХНИЙ край экрана, то пробуем перенести
        // его на другую сторону, если она указана, иначе имитируем sticky
        if (oppositeSide) {
            const yOpposite = calculateYForPosition(oppositeSide);
            yPosition = Math.max(yOpposite, yPosition);
        } else {
            yPosition = Math.min(
                Math.max(yPosition, topLimit),
                targetY + targetHeight - tooltipHeight,
            );
        }
    } else if (yPosition > bottomLimit) {
        // Если тултип заходит за НИЖНИЙ край экрана, то пробуем перенести
        // его на другую сторону, если она указана, иначе имитируем sticky
        if (oppositeSide) {
            const yOpposite = calculateYForPosition(oppositeSide);
            yPosition = Math.min(yOpposite, yPosition);
        } else {
            yPosition = Math.max(Math.min(yPosition, bottomLimit), targetY);
        }
    }

    y.value = yPosition + window.scrollY;
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
            return targetX + targetWidth + $props.offset;

        case ETooltipPosition.LEFT_END:
        case ETooltipPosition.LEFT_START:
        case ETooltipPosition.LEFT_CENTER:
            return targetX - tooltipWidth - $props.offset;
    }
}

function calculateYForPosition(somePosition: ETooltipPosition): number {
    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    switch (somePosition) {
        case ETooltipPosition.TOP_START:
        case ETooltipPosition.TOP_END:
        case ETooltipPosition.TOP_CENTER:
            return targetY - tooltipHeight - $props.offset;

        case ETooltipPosition.BOTTOM_START:
        case ETooltipPosition.BOTTOM_END:
        case ETooltipPosition.BOTTOM_CENTER:
            return targetY + targetHeight + $props.offset;

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
</script>

<style lang="scss" module>
.PotTooltip {
    position: absolute;
}

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--pot-spacer-2);
    background-color: var(--pot-base-600);
}
</style>
