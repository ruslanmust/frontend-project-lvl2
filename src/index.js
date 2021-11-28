import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';
import tree from './tree.js';

const extractFormat = (filename) => path.extname(filename);
const readFile = (filename) => fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

const compare = (filepath1, filepath2, formatName = 'stylish') => {
  const file1extention = extractFormat(filepath1);
  const file2extention = extractFormat(filepath2);
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const obj1 = parse(file1extention, fileContent1);
  const obj2 = parse(file2extention, fileContent2);
  const innerTree = tree(obj1, obj2);
  return stylish(innerTree, formatName);
};
export default compare;
