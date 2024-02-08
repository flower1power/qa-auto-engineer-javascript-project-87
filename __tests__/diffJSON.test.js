import path from 'path';
import diffJSON from '../diffJSON.js';

const getFixturePath = (filename) =>
	path.join(__dirname, '..', '__fixtures__', filename);

describe('diffJSON', () => {
	test('Сравнение 2 плоских JSON', () => {
		const filepath1 = getFixturePath('file1.json');
		const filepath2 = getFixturePath('file2.json');

		const expectedDiff =
			'{\n' +
			'  - follow: false\n' +
			'    host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'  + timeout: 20\n' +
			'  + verbose: true\n' +
			'}';

		expect(diffJSON(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение одинаковых файлов', () => {
		const filepath1 = getFixturePath('file2.json');
		const filepath2 = getFixturePath('file3.json');

		const expectedDiff =
			'{\n' +
			'    host: hexlet.io\n' +
			'    timeout: 20\n' +
			'    verbose: true\n' +
			'}';

		expect(diffJSON(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение с пустым файлом', () => {
		const filepath1 = getFixturePath('file1.json');
		const filepath2 = getFixturePath('empty.json');

		const expectedDiff =
			'{\n' +
			'  - follow: false\n' +
			'  - host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'}';

		expect(diffJSON(filepath1, filepath2)).toEqual(expectedDiff);
	});

	test('Сравнение файлов без общих ключей', () => {
		const filepath1 = getFixturePath('file1.json');
		const filepath2 = getFixturePath('uniqueKeys.json');

		const expectedDiff =
			'{\n' +
			'  + enabled: true\n' +
			'  - follow: false\n' +
			'  - host: hexlet.io\n' +
			'  - proxy: 123.234.53.22\n' +
			'  - timeout: 50\n' +
			'  + user: admin\n' +
			'}';

		expect(diffJSON(filepath1, filepath2)).toEqual(expectedDiff);
	});
});
