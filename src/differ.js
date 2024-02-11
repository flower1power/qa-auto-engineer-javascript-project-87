import _ from 'lodash';
import readFile from './utils.js';

export default (file1, file2) => {
  const filepath1 = readFile(file1);
  const filepath2 = readFile(file2);
  const parsedFile1 = JSON.parse(filepath1);
  const parsedFile2 = JSON.parse(filepath2);

  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);

  const sumKeys = _.union(keys1, keys2).sort();

  const result = sumKeys.map((key) => {
    if (!_.has(parsedFile1, key)) {
      return `+ ${key}: ${parsedFile2[key]}\n`;
    } 
    if (!_.has(parsedFile2, key)) {
      return `- ${key}: ${parsedFile1[key]}\n`;
    }
    if (parsedFile1[key] !== parsedFile2[key]) {
      return `- ${key}: ${parsedFile1[key]}\n+ ${key}: ${parsedFile2[key]}\n`;
    }
    return `  ${key}: ${parsedFile1[key]}\n`;
  }).join('');

  return `{\n${result}}`;
};