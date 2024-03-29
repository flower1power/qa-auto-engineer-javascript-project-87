import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './dataCompare.js';
import parser from './parsers.js';
import formatter from './formattes/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);

  const data1 = readFileSync(pathOne);
  const data2 = readFileSync(pathTwo);

  const extOne = path.extname(filepath1);
  const extTwo = path.extname(filepath2);

  const obj1 = parser(data1, extOne);
  const obj2 = parser(data2, extTwo);

  const data = buildTree(obj1, obj2);
  return formatter(data, formatName);
};
export default gendiff;
