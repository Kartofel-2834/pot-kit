export const DEPENDENCIES: { 
    components: Record<string, Record<string, string[]>>,
    composables: Record<string, Record<string, string[]>>,
} = {
    components: {
        "button": {
            "components": [
                "icon"
            ],
            "composables": [
                "class-list",
                "device-is",
                "device-properties"
            ],
            "types": [
                "components/button",
                "index"
            ]
        },
        "icon": {
            "components": [],
            "composables": [],
            "types": [
                "components/icon"
            ]
        }
    },
    
    composables: {
        "class-list": {
            "components": [],
            "composables": [],
            "types": []
        },
        "device-is": {
            "components": [],
            "composables": [],
            "types": [
                "composables/device-is",
                "index"
            ]
        },
        "device-properties": {
            "components": [],
            "composables": [],
            "types": [
                "composables/device-properties",
                "index"
            ]
        },
        "form": {
            "components": [],
            "composables": [],
            "types": [
                "composables/form"
            ]
        },
        "specs": {
            "components": [],
            "composables": [],
            "types": [
                "composables/specs"
            ]
        }
    }
};