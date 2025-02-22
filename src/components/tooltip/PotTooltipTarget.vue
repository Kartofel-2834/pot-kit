<script lang="ts">
// Types
import type { VNode, VNodeArrayChildren } from 'vue';

// Vue
import { cloneVNode, defineComponent } from 'vue';

export default defineComponent({
    emits: {
        'mount-target': (element: HTMLElement) => element instanceof HTMLElement,
        'unmount-target': (element: HTMLElement | null) => {
            return element instanceof HTMLElement || element === null;
        },
    },

    setup(props, { slots, emit }) {
        let targetId: number = NaN;

        function cloneNodes(
            childrenNodes: VNodeArrayChildren,
            onMount: (element: HTMLElement) => unknown,
            onUnmount: (element: HTMLElement | null) => unknown,
        ): VNodeArrayChildren {
            if (!isNaN(targetId) || !Array.isArray(childrenNodes)) {
                return childrenNodes;
            }

            return childrenNodes.map(childNode => {
                if (Array.isArray(childNode)) {
                    return cloneNodes(childNode, onMount, onUnmount);
                }

                const id = Math.floor(Math.random() * (1e18 - 1e16)) + 1e16;

                return cloneVNode(childNode as VNode, {
                    onVnodeMounted(vnode) {
                        if (isNaN(targetId) && vnode.el instanceof HTMLElement) {
                            onMount(vnode.el as HTMLElement);
                            targetId = id;
                        }
                    },

                    onVnodeUnmounted(vnode) {
                        if (targetId !== id) {
                            return;
                        }

                        const element = vnode.el instanceof HTMLElement ? vnode.el : null;
                        targetId = NaN;

                        onUnmount(element);
                    },
                });
            });
        }

        return () => {
            if (!slots?.default) {
                return null;
            }

            const defaultSlot = slots.default();

            if (!Array.isArray(defaultSlot?.[0]?.children)) {
                return defaultSlot;
            }

            targetId = NaN;

            defaultSlot[0].children = cloneNodes(
                defaultSlot[0].children,
                v => emit('mount-target', v),
                v => emit('unmount-target', v),
            );

            return defaultSlot;
        };
    },
});
</script>
