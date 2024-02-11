import genDiff from '../src/index.js';
import { describe, expect, it } from '@jest/globals';

const expected = '{\n' +
  '- follow: false\n' +
  '  host: hexlet.io\n' +
  '- proxy: 123.234.53.22\n' +
  '- timeout: 50\n' +
  '+ timeout: 20\n' +
  '+ verbose: true\n' +
'}';

describe('genDiff', () => {
	it('test1', () => {
		const actual = genDiff(
			'./__fixtures__/file1.json',
			'./__fixtures__/file2.json'
		);
		expect(actual).toBe(expected);
	});
});
