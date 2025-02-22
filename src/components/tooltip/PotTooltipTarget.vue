<script lang="ts">
// Types
import type { VNode, VNodeArrayChildren } from 'vue';

// Vue
import { ref, cloneVNode } from 'vue';

const targetId = ref<number>(NaN);

function cloneNodes(
    childrenNodes: VNodeArrayChildren,
    onMount: (element: Element) => unknown,
    onUnmount: (element: Element | null) => unknown,
): VNodeArrayChildren {
    if (!isNaN(targetId.value) || !Array.isArray(childrenNodes)) {
        return childrenNodes;
    }

    return childrenNodes.map(childNode => {
        if (Array.isArray(childNode)) {
            return cloneNodes(childNode, onMount, onUnmount);
        }

        const id = Math.floor(Math.random() * (1e18 - 1e16)) + 1e16;

        return cloneVNode(childNode as VNode, {
            onVnodeMounted(vnode) {
                if (isNaN(targetId.value) && vnode.el instanceof Element) {
                    onMount(vnode.el as HTMLElement);
                    targetId.value = id;
                }
            },

            onVnodeUnmounted(vnode) {
                if (targetId.value !== id) {
                    return;
                }

                const element = vnode.el instanceof Element ? vnode.el : null;
                targetId.value = NaN;

                onUnmount(element);
            },
        });
    });
}

export default {
    setup(props, { slots, emit }) {
        return () => {
            if (!slots?.default) {
                return null;
            }

            const defaultSlot = slots.default();

            if (!Array.isArray(defaultSlot?.[0]?.children)) {
                return defaultSlot;
            }

            targetId.value = NaN;

            defaultSlot[0].children = cloneNodes(
                defaultSlot[0].children,
                v => emit('mount-target', v),
                v => emit('unmount-target', v),
            );

            return defaultSlot;
        };
    },
};
</script>
