<template>
    <PotTooltipTarget
        @mount-target="targetRef = $event"
        @unmount-target="targetRef = $event"
    >
        <slot />
    </PotTooltipTarget>

    <Teleport :to="to">
        <Transition :name="properties.transition ?? undefined">
            <div
                v-if="persistent || isVisible"
                v-show="isVisible"
                ref="tooltipRef"
                :class="['pot-tooltip', classList]"
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
                    <div class="pot-tooltip__wrapper">
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
import type { IPotTooltipProps, IPotTooltipSlots } from '@/types/components';
import type { TDeviceIs } from '@/types/composables';
import type { EPotTooltipPosition } from '@/enums/components';

// Enums
import { POT_COLOR_THEME, POT_SIZE } from '@/enums/preset';
import { POT_RADIUS, POT_TOOLTIP_POSITION } from '@/enums/components';

// Vue
import { ref, watch, computed, shallowRef, inject } from 'vue';

// Composables
import { useResizeObserver } from '@/composables/resize-observer';
import { useDeviceProperties } from '@/composables/device-properties';
import { useClassList } from '@/composables/class-list';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';

// Components
import PotTooltipTarget from '@/components/tooltip/PotTooltipTarget.vue';

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

const xOppositePositions: Record<EPotTooltipPosition, EPotTooltipPosition | null> = {
    [POT_TOOLTIP_POSITION.TOP_START]: POT_TOOLTIP_POSITION.TOP_END,
    [POT_TOOLTIP_POSITION.TOP_END]: POT_TOOLTIP_POSITION.TOP_START,
    [POT_TOOLTIP_POSITION.TOP_CENTER]: null,

    [POT_TOOLTIP_POSITION.BOTTOM_START]: POT_TOOLTIP_POSITION.BOTTOM_END,
    [POT_TOOLTIP_POSITION.BOTTOM_END]: POT_TOOLTIP_POSITION.BOTTOM_START,
    [POT_TOOLTIP_POSITION.BOTTOM_CENTER]: null,

    [POT_TOOLTIP_POSITION.LEFT_START]: POT_TOOLTIP_POSITION.RIGHT_START,
    [POT_TOOLTIP_POSITION.LEFT_END]: POT_TOOLTIP_POSITION.RIGHT_END,
    [POT_TOOLTIP_POSITION.LEFT_CENTER]: POT_TOOLTIP_POSITION.RIGHT_CENTER,

    [POT_TOOLTIP_POSITION.RIGHT_START]: POT_TOOLTIP_POSITION.LEFT_START,
    [POT_TOOLTIP_POSITION.RIGHT_END]: POT_TOOLTIP_POSITION.LEFT_END,
    [POT_TOOLTIP_POSITION.RIGHT_CENTER]: POT_TOOLTIP_POSITION.LEFT_CENTER,
};

const yOppositePositions: Record<EPotTooltipPosition, EPotTooltipPosition | null> = {
    [POT_TOOLTIP_POSITION.TOP_START]: POT_TOOLTIP_POSITION.BOTTOM_START,
    [POT_TOOLTIP_POSITION.TOP_END]: POT_TOOLTIP_POSITION.BOTTOM_END,
    [POT_TOOLTIP_POSITION.TOP_CENTER]: POT_TOOLTIP_POSITION.BOTTOM_CENTER,

    [POT_TOOLTIP_POSITION.BOTTOM_START]: POT_TOOLTIP_POSITION.TOP_START,
    [POT_TOOLTIP_POSITION.BOTTOM_END]: POT_TOOLTIP_POSITION.TOP_END,
    [POT_TOOLTIP_POSITION.BOTTOM_CENTER]: POT_TOOLTIP_POSITION.TOP_CENTER,

    [POT_TOOLTIP_POSITION.LEFT_START]: null,
    [POT_TOOLTIP_POSITION.LEFT_END]: null,
    [POT_TOOLTIP_POSITION.LEFT_CENTER]: null,

    [POT_TOOLTIP_POSITION.RIGHT_START]: null,
    [POT_TOOLTIP_POSITION.RIGHT_END]: null,
    [POT_TOOLTIP_POSITION.RIGHT_CENTER]: null,
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
    position: POT_TOOLTIP_POSITION.TOP_CENTER,
    size: POT_SIZE.MEDIUM,
    color: POT_COLOR_THEME.PRIMARY,
    radius: POT_RADIUS.MEDIUM,
});

const $emit = defineEmits<{
    open: [];
    close: [];
}>();

defineSlots<IPotTooltipSlots>();

const $deviceIs = inject<TDeviceIs>('deviceIs');

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
        $deviceIs?.device.value,
    );
});

const classList = computed(() =>
    useClassList({
        size: properties.value.size,
        position: properties.value.position,
        color: properties.value.color,
        radius: properties.value.radius,
    }),
);

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

watch(() => properties.value.offset, refresh);
watch(() => properties.value.screenOffset, refresh);
watch(() => properties.value.position, refresh);

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
    const currentPosition = properties.value.position;

    if (!currentPosition) {
        close();
        return;
    }

    x.value = calculateLimitedX(currentPosition) + window.scrollX;
}

function calculateY() {
    const currentPosition = properties.value.position;

    if (!currentPosition) {
        close();
        return;
    }

    y.value = calculateLimitedY(currentPosition) + window.scrollY;
}

function calculateLimitedX(somePosition: EPotTooltipPosition): number {
    const xPosition = calculateXForPosition(somePosition);
    const oppositeSide = xOppositePositions[somePosition];

    if ($props.fixed || !oppositeSide) {
        return xPosition;
    }

    const { width: tooltipWidth } = tooltipSizes.value;

    const screenOffset = properties.value.screenOffset || 0;
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

function calculateLimitedY(somePosition: EPotTooltipPosition): number {
    if ($props.fixed) {
        return calculateYForPosition(somePosition);
    }

    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    const yPosition = calculateYForPosition(somePosition);
    const oppositeSide = yOppositePositions[somePosition];

    const screenOffset = properties.value.screenOffset || 0;
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

function calculateXForPosition(somePosition: EPotTooltipPosition): number {
    const { x: targetX, width: targetWidth } = targetSizes.value;
    const { width: tooltipWidth } = tooltipSizes.value;

    switch (somePosition) {
        case POT_TOOLTIP_POSITION.TOP_CENTER:
        case POT_TOOLTIP_POSITION.BOTTOM_CENTER:
            return targetX + targetWidth / 2 - tooltipWidth / 2;

        case POT_TOOLTIP_POSITION.TOP_START:
        case POT_TOOLTIP_POSITION.BOTTOM_START:
            return targetX;

        case POT_TOOLTIP_POSITION.TOP_END:
        case POT_TOOLTIP_POSITION.BOTTOM_END:
            return targetX + targetWidth - tooltipWidth;

        case POT_TOOLTIP_POSITION.RIGHT_END:
        case POT_TOOLTIP_POSITION.RIGHT_START:
        case POT_TOOLTIP_POSITION.RIGHT_CENTER:
            return targetX + targetWidth + (properties.value.offset || 0);

        case POT_TOOLTIP_POSITION.LEFT_END:
        case POT_TOOLTIP_POSITION.LEFT_START:
        case POT_TOOLTIP_POSITION.LEFT_CENTER:
            return targetX - tooltipWidth - (properties.value.offset || 0);
    }
}

function calculateYForPosition(somePosition: EPotTooltipPosition): number {
    const { y: targetY, height: targetHeight } = targetSizes.value;
    const { height: tooltipHeight } = tooltipSizes.value;

    switch (somePosition) {
        case POT_TOOLTIP_POSITION.TOP_START:
        case POT_TOOLTIP_POSITION.TOP_END:
        case POT_TOOLTIP_POSITION.TOP_CENTER:
            return targetY - tooltipHeight - (properties.value.offset || 0);

        case POT_TOOLTIP_POSITION.BOTTOM_START:
        case POT_TOOLTIP_POSITION.BOTTOM_END:
        case POT_TOOLTIP_POSITION.BOTTOM_CENTER:
            return targetY + targetHeight + (properties.value.offset || 0);

        case POT_TOOLTIP_POSITION.RIGHT_START:
        case POT_TOOLTIP_POSITION.LEFT_START:
            return targetY;

        case POT_TOOLTIP_POSITION.RIGHT_END:
        case POT_TOOLTIP_POSITION.LEFT_END:
            return targetY + targetHeight - tooltipHeight;

        case POT_TOOLTIP_POSITION.RIGHT_CENTER:
        case POT_TOOLTIP_POSITION.LEFT_CENTER:
            return targetY + targetHeight / 2 - tooltipHeight / 2;
    }
}
/* --- TOOLTIP POSITION CALCULATIONS - END --- */
</script>

<style lang="scss">
.pot-tooltip {
    position: absolute;

    /* --- Colors - START --- */
    .pot-tooltip__wrapper {
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
        .pot-tooltip__wrapper {
            padding: map-get($size, 'padding');
            font-size: map-get($size, 'text');
        }
    }

    /* --- Radius --- */
    @include radius('.pot-tooltip__wrapper');
}
</style>
