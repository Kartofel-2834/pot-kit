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

// Vue
import { ref, computed, cloneVNode, watch, onMounted, onUnmounted } from 'vue';

// Composables
import { getResizeObserver, useResize } from '@/composables/resize';
import { multiActionListener } from '@/utils/timer-utils';

interface IPotTooltipProps {
    to?: string | RendererElement | null;
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

    const defaultSlotVNodes = $slots.default();

    if (!defaultSlotVNodes.length) {
        return null;
    }

    // Используем первый VNode в качестве цели к которой мы прикрепим тултип
    defaultSlotVNodes[0] = cloneVNode(defaultSlotVNodes[0], {
        onVnodeMounted(vnode) {
            targetRef.value = vnode.el;
        },

        onVnodeUnmounted() {
            targetRef.value = null;
        },
    });

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
    return (
        targetSizes.value.x +
        targetSizes.value.width / 2 -
        tooltipSizes.value.width / 2 +
        window.scrollX
    );
});

const y = computed<number>(() => {
    return targetSizes.value.y - tooltipSizes.value.height - $props.offset + window.scrollY;
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
