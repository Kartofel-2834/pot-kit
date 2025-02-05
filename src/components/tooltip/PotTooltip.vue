<template>
    <render />

    <Teleport :to="to">
        <div
            v-tooltip-resize
            ref="tooltipRef"
            :class="$style.PotTooltip"
            :style="{ transform: `translate(${x}px, ${y}px)` }"
        >
            Kamal
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
// Types
import type { VNode, RendererNode, RendererElement } from 'vue';

// Enums
import { ETooltipPosition } from '@/enums/components';

// Vue
import { ref, computed, cloneVNode, watch, onMounted, onUnmounted } from 'vue';

// Composables
import { getResizeObserver, useResize } from '@/composables/resize';
import { multiActionListener } from '@/utils/timer-utils';

interface IPotTooltipProps {
    to?: string | RendererElement | null;
    position?: ETooltipPosition;
    offset?: number;
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

const $props = withDefaults(defineProps<IPotTooltipProps>(), {
    to: '#pot-modal-lay',
    offset: 12,
    position: ETooltipPosition.TOP_CENTER,
});

const $slots = defineSlots<{
    default: () => VNode[];
}>();

const targetRef = ref<RendererNode | null>(null);
const tooltipRef = ref<Element | null>(null);

const targetSizes = ref<DOMRect>({ ...emptyRect });
const tooltipSizes = ref<DOMRect>({ ...emptyRect });

const vTooltipResize = useResize({ onEnd: updateTooltipSizes });

const targetResizeObserver = getResizeObserver({ onEnd: updateTargetSizes });

const windowScrollListener = multiActionListener({
    onEnd: () => {
        updateTargetSizes();
        updateTooltipSizes();
    },
});

const windowResizeListener = multiActionListener({
    onEnd: () => {
        updateTargetSizes();
        updateTooltipSizes();
    },
});

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
onMounted(() => {
    window.addEventListener('scroll', windowScrollListener);
    window.addEventListener('resize', windowResizeListener);
});

onUnmounted(() => {
    window.removeEventListener('scroll', windowScrollListener);
    window.removeEventListener('resize', windowResizeListener);
});

// Computed
const x = computed<number>(() => {
    const { x: targetX, width: targetWidth } = targetSizes.value;
    const { width: tooltipWidth } = tooltipSizes.value;

    let xPosition: number = 0;

    switch ($props.position) {
        case ETooltipPosition.TOP_CENTER:
        case ETooltipPosition.BOTTOM_CENTER:
            xPosition = targetX + targetWidth / 2 - tooltipWidth / 2;
            break;

        case ETooltipPosition.TOP_START:
        case ETooltipPosition.BOTTOM_START:
            xPosition = targetX;
            break;

        case ETooltipPosition.TOP_END:
        case ETooltipPosition.BOTTOM_END:
            xPosition = targetX + targetWidth - tooltipWidth;
            break;

        case ETooltipPosition.RIGHT_END:
        case ETooltipPosition.RIGHT_START:
        case ETooltipPosition.RIGHT_CENTER:
            xPosition = targetX + targetWidth;
            break;

        case ETooltipPosition.LEFT_END:
        case ETooltipPosition.LEFT_START:
        case ETooltipPosition.LEFT_CENTER:
            xPosition = targetX - tooltipWidth;
            break;
    }

    return xPosition + window.scrollX;
});

const y = computed<number>(() => {
    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    let yPosition: number = 0;

    switch ($props.position) {
        case ETooltipPosition.TOP_START:
        case ETooltipPosition.TOP_END:
        case ETooltipPosition.TOP_CENTER:
            yPosition = targetY - tooltipHeight;
            break;

        case ETooltipPosition.BOTTOM_START:
        case ETooltipPosition.BOTTOM_END:
        case ETooltipPosition.BOTTOM_CENTER:
            yPosition = targetY + targetHeight;
            break;

        case ETooltipPosition.RIGHT_START:
        case ETooltipPosition.LEFT_START:
            yPosition = targetY;
            break;

        case ETooltipPosition.RIGHT_END:
        case ETooltipPosition.LEFT_END:
            yPosition = targetY + targetHeight - tooltipHeight;
            break;

        case ETooltipPosition.RIGHT_CENTER:
        case ETooltipPosition.LEFT_CENTER:
            yPosition = targetY + targetHeight / 2 - tooltipHeight / 2;
            break;
    }

    return yPosition + window.scrollY;
});

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

// Methods
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
</script>

<style lang="scss" module>
.PotTooltip {
    position: absolute;
    transition: transform var(--pot-transition);

    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 50px;
    background-color: green;
    color: white;
}
</style>
