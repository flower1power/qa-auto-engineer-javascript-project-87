#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
	.helpOption('-h, --help', 'output usage information')
	.version('0.0.1', '-V, --version', 'output the version number')
	.option('-f, --format [type]', 'output format')
	.arguments('<file1> <file2>')
	.action((file1, file2) => {
		console.log(genDiff(file1, file2));
	});

program.parse();
