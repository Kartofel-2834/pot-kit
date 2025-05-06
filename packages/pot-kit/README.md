# pot-kit

Tool for installing cool and unstyled vue-components

## Usage

### Just run it using npx

```sh
npx pot-kit@latest add button
```

### If you want to configure it you can add .pot-kit/installation.ts file in your project root directory:

```ts
// This config is used by default
export default {
    components: './src/components/ui/', // Path to directory for components
    composables: './src/composables/', // Path to directory for composables
    types: './src/types/pot-kit/', // Path to directory for types
    styles: './src/assets/css/ui/', // Path to directory for styles (used only by pot-kit-gen)

    // Replacements map for imports in components and composables
    imports: {
        '@': './src',
    },
    options: {
        prefix: 'pot', // Prefix for all components
        overwrite: false, // Overwrite existing files
        potServer: false, // Use our server instead of cloudflare cdn
    },
};
```

### Use list command to see all available components (you can also check and play with then on our website (coming soon))

```sh
npx pot-kit@latest list
```

### Done! Enjoy your new components and chill out B)
