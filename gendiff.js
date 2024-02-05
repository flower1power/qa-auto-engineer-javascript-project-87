#!/usr/bin/env node
import { program } from 'commander';
import diff from './diff.js';

program
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.argument('<filepath1>', 'path to first config file')
	.argument('<filepath2>', 'path to second config file')
	.option('-f, --format <type>', 'output format')
	.helpOption('-h, --help', 'output usage information')
	.action((filepath1, filepath2, options) => {
		const result = diff(filepath1, filepath2);
		console.log(result);
	});

program.parse(process.argv);
