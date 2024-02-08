import path from 'path';
import diffYAML from '../diffYAML.js';

const getFixturePath = (filename) =>
	path.join(__dirname, '..', '__fixtures__', filename);

describe('diffYAML', () => {
	test('Сравнение 2 плоских YAML файлов', () => {
		const filepath1 = getFixturePath('file1.yaml');
		const filepath2 = getFixturePath('file2.yaml');

		const expectedDiff =
			'{\n' +
			'  - follow: false\n' +
			'    host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'  + timeout: 20\n' +
			'  + verbose: true\n' +
			'}';


		expect(diffYAML(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение одинаковых YAML файлов', () => {
		const filepath1 = getFixturePath('file3.yaml');
		const filepath2 = getFixturePath('file4.yaml');

		const expectedDiff =
			'{\n' +
			'    host: hexlet.io\n' +
			'    timeout: 20\n' +
			'    verbose: true\n' +
			'}';

		expect(diffYAML(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение с пустым YAML файлом', () => {
		const filepath1 = getFixturePath('file1.yaml');
		const filepath2 = getFixturePath('empty.yaml');

		const expectedDiff =
			'{\n' +
			'  - follow: false\n' +
			'  - host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'}';

		expect(diffYAML(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение YAML файлов без общих ключей', () => {
		const filepath1 = getFixturePath('file1.yaml');
		const filepath2 = getFixturePath('uniqueKeys.yaml');

		const expectedDiff =
			'{\n' +
			'  + enabled: true\n' +
			'  - follow: false\n' +
			'  - host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'  + user: admin\n' +
			'}';

		expect(diffYAML(filepath1, filepath2)).toEqual(expectedDiff);
	});
});
