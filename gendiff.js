#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import diffJSON from './diffJSON.js';
import diffYAML from './diffYAML.js';


const getDiffFunction = (filepath1, filepath2) => {
	const extension1 = path.extname(filepath1);
	const extension2 = path.extname(filepath2);

	if (extension1 === '.json' && extension2 === '.json') {
		return diffJSON;
	} else if (
		(extension1 === '.yml' || extension1 === '.yaml') &&
		(extension2 === '.yml' || extension2 === '.yaml')
	) {
		return diffYAML;
	} else {
		throw new Error('Unsupported file type');
	}
};

program
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.argument('<filepath1>', 'path to first config file')
	.argument('<filepath2>', 'path to second config file')
	.option('-f, --format <type>', 'output format')
	.helpOption('-h, --help', 'output usage information')
	.action((filepath1, filepath2) => {
		const diffFunction = getDiffFunction(filepath1, filepath2);
		const result = diffFunction(filepath1, filepath2);
		console.log(result);
	});

program.parse(process.argv);
