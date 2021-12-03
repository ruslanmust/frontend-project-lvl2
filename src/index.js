import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import tree from './tree.js';

const extractFormat = (filename) => path.extname(filename);
const readFile = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const compare = (filepath1, filepath2, formatName = 'stylish') => {
  const file1extention = extractFormat(filepath1);
  const file2extention = extractFormat(filepath2);
  const file1Read = readFile(filepath1);
  const file2Read = readFile(filepath2);
  const obj1 = parse(file1extention, file1Read);
  const obj2 = parse(file2extention, file2Read);
  const innerTree = tree(obj1, obj2);
  return format(innerTree, formatName);
};
export default compare;
