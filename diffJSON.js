import { parseJSON } from './parsers.js';
import _ from 'lodash';

const diffJSON = (filepath1, filepath2) => {
  const file1Content = parseJSON(filepath1);
  const file2Content = parseJSON(filepath2);

  const keysUnion = _.union(Object.keys(file1Content), Object.keys(file2Content)).sort();
  
  let result = '{\n';
  keysUnion.forEach((key) => {
    if (!_.has(file2Content, key)) {
      result += `  - ${key}: ${file1Content[key]}\n`;
    } else if (!_.has(file1Content, key)) {
      result += `  + ${key}: ${file2Content[key]}\n`;
    } else if (file1Content[key] !== file2Content[key]) {
      result += `  - ${key}: ${file1Content[key]}\n  + ${key}: ${file2Content[key]}\n`;
    } else {
      result += `    ${key}: ${file1Content[key]}\n`;
    }
  });
  result += '}';
  return result;
};

export default diffJSON;
