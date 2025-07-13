#!/usr/bin/env node
// Libs
import { Command } from 'commander';

// Constants
import packageJson from '../package.json';

// Commands
import { init } from './commands/init';

// Logger
import { injectStyles } from './commands/inject';

async function main() {
    const program = new Command();

    // Info
    program.name('pot-gen');
    program.description('Generate style and enums for pot-kit components in your project');
    program.version(packageJson.version || '1.0.0', '-v, --version', 'output the current version');

    // Commands
    program.addCommand(init());
    program.addCommand(injectStyles());

    // Run
    program.parse();
}

main();
