#!/usr/bin/env node
// Libs
import { Command } from 'commander';

// Constants
import packageJson from '../package.json';

// Commands
import { add } from './commands/add';
import { list } from './commands/list';

async function main() {
    const program = new Command();

    // Info
    program.name('pot');
    program.description('Install unstyled components to your project');
    program.version(packageJson.version || '1.0.0', '-v, --version', 'output the current version');

    // Commands
    program.addCommand(add());
    program.addCommand(list());

    // Run
    program.parse();
}

main();
