import { parseYAML } from './parsers.js';

function diffYAML(filepath1, filepath2) {
  const file1 = parseYAML(filepath1);
  const file2 = parseYAML(filepath2);

  const keysUnion = [...new Set([...Object.keys(file1), ...Object.keys(file2)])].sort();
  
  let result = '{\n';
  keysUnion.forEach((key) => {
    const hasKey1 = Object.hasOwnProperty.call(file1, key);
    const hasKey2 = Object.hasOwnProperty.call(file2, key);
    if (hasKey1 && hasKey2) {
      if (file1[key] === file2[key]) {
        result += `    ${key}: ${file1[key]}\n`;
      } else {
        result += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      }
    } else if (hasKey1) {
      result += `  - ${key}: ${file1[key]}\n`;
    } else if (hasKey2) {
      result += `  + ${key}: ${file2[key]}\n`;
    }
  });
  result += '}';
  return result;
}

export default diffYAML;
