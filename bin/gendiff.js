#!/usr/bin/env node
import { Command, program } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => {
	const currentDirecory = process.cwd();
	const fullPath = path.resolve(currentDirecory, filePath);
	return fs.readFileSync(fullPath, { encoding: 'utf8' });
};

program
	.helpOption('-h, --help', 'output usage information')
	.version('0.0.1', '-V, --version', 'output the version number')
	.option('-f, --format [type]', 'output format')
	.arguments('<file1> <file2>')
	.action((filepath1, filepath2) => {
		const file1 = readFile(filepath1);
		const file2 = readFile(filepath2);
		const parsFile1 = JSON.parse(file1);
		const parsFile2 = JSON.parse(file2);

		const keys1 = Object.keys(parsFile1);
		const keys2 = Object.keys(parsFile2);

		const sumKeys = _.union(keys1, keys2).sort();

		const genDiff = (key) => {
			let str = '';
			if (parsFile1[key] === parsFile2[key]) {
				str = `  ${key}: ${parsFile1[key]}\n`;
			}
			if (parsFile1[key] !== parsFile2[key]) {
				str = `- ${key}: ${parsFile1[key]}\n + ${key}: ${parsFile2[key]}\n`;
			}
			if (!_.has(parsFile1, key)) {
				str = `+ ${key}: ${parsFile2[key]}\n`;
			}
			if (!_.has(parsFile2, key)) {
				str = `- ${key}: ${parsFile1[key]}\n`;
			}
			return str;
		};

		const result = sumKeys.map((key) => genDiff(key)).join(' ');
		console.log(`{\n ${result}}`);
	});

program.parse();
