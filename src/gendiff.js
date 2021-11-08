import path from 'path';
import { parseJSON, parseYAML } from './parsers.js';

const defineExt = (file) => {
  const yamlExts = ['.yaml', '.yml'];
  if (path.extname(file) === '.json') {
    return parseJSON(file);
  }
  if (yamlExts.includes(path.extname(file))) {
    return parseYAML(file);
  }
  throw new Error('Incorrect file extention');
};

export default (filepath1, filepath2) => {
  const file1 = defineExt(filepath1);
  const file2 = defineExt(filepath2);

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const commonKeys = keysFile1.concat(keysFile2.filter((key) => !keysFile1.includes(key))).sort();

  const cb = (acc, item) => {
    if (file1[item] === file2[item]) {
      acc[`  ${item}`] = file1[item];
    }
    if (file1[item] !== file2[item]) {
      acc[`- ${item}`] = file1[item];
      acc[`+ ${item}`] = file2[item];
    }
    return acc;
  };

  const compareItems = commonKeys.reduce(cb, {});
  const result = JSON.stringify(compareItems, null, 2).replace(/['"]+/g, '');

  return result;
};
