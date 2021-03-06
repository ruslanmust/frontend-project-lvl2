import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compare from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.yml', 'file2.yml', 'expected_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expected_json.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "%s" style', (firstArg, secondArg, expectedResult, format) => {
  const pathTofile1 = getFixturePath(firstArg);
  const pathTofile2 = getFixturePath(secondArg);
  const expected = readFile(expectedResult);
  const result = compare(pathTofile1, pathTofile2, format);
  expect(result).toEqual(expected);
});
