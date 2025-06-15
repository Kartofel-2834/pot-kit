export const DEPENDENCIES: {
    components: Record<string, Record<string, string[]>>;
    composables: Record<string, Record<string, string[]>>;
} = {
    components: {
        button: {
            components: [],
            composables: ['class-list', 'device-is', 'device-properties'],
            types: ['components/button', 'index'],
        },
        popover: {
            components: ['slot-catcher'],
            composables: ['popover', 'dialog', 'class-list', 'device-is', 'device-properties'],
            types: ['components/popover', 'index'],
        },
        'slot-catcher': {
            components: [],
            composables: [],
            types: ['components/slot-catcher'],
        },
    },

    composables: {
        'class-list': {
            components: [],
            composables: [],
            types: [],
        },
        'device-is': {
            components: [],
            composables: [],
            types: ['composables/device-is', 'index'],
        },
        'device-properties': {
            components: [],
            composables: [],
            types: ['composables/device-properties', 'index'],
        },
        popover: {
            components: [],
            composables: ['surrounding'],
            types: [
                'components/popover',
                'composables/popover',
                'composables/surrounding',
                'index',
            ],
        },
        surrounding: {
            components: [],
            composables: [],
            types: ['composables/surrounding'],
        },
    },
};
