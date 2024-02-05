import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const diff = (filepath1, filepath2) => {
	const absolutePath1 = path.resolve(process.cwd(), filepath1);
	const absolutePath2 = path.resolve(process.cwd(), filepath2);

	const file1Content = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
	const file2Content = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));

	const keysUnion = _.union(
		Object.keys(file1Content),
		Object.keys(file2Content)
	).sort();

	const difference = keysUnion
		.map((key) => {
			if (!_.has(file2Content, key)) {
				return `  - ${key}: ${file1Content[key]}`;
			}
			if (!_.has(file1Content, key)) {
				return `  + ${key}: ${file2Content[key]}`;
			}
			if (file1Content[key] === file2Content[key]) {
				return `    ${key}: ${file1Content[key]}`;
			}
			return `  - ${key}: ${file1Content[key]}\n  + ${key}: ${file2Content[key]}`;
		})
		.join('\n');

	return `{\n${difference}\n}`;
};

export default diff;
