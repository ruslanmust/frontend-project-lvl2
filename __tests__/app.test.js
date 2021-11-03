import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import compare from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (file) => {
  const expectedFile = JSON.parse(fs.readFileSync(getFixturePath(file), { encoding: 'utf8', flag: 'r' }));
  return JSON.stringify(expectedFile, null, 2).replace(/['"]+/g, '');
};

test('compare', () => {
  expect(compare(getFixturePath('file1.json'),
    getFixturePath('file2.json'))).toMatch(readFile('expected_file.json'));
});
