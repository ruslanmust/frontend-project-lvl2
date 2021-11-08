import { test, expect } from '@jest/globals';
import YAML from 'yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import compare from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readJSON = (file) => {
  const expectedFile = JSON.parse(fs.readFileSync(getFixturePath(file), { encoding: 'utf8', flag: 'r' }));
  return JSON.stringify(expectedFile, null, 2).replace(/['"]+/g, '');
};

const readYAML = (file) => {
  const expectedFile = YAML.parse(fs.readFileSync(getFixturePath(file), { encoding: 'utf8', flag: 'r' }));
  return JSON.stringify(expectedFile, null, 2).replace(/['"]+/g, '');
};

test('compareJSON', () => {
  expect(compare(getFixturePath('file1.json'),
    getFixturePath('file2.json'))).toMatch(readJSON('expected_file.json'));
});

test('compareYAML', () => {
  expect(compare(getFixturePath('file3.yaml'),
    getFixturePath('file4.yml'))).toMatch(readYAML('expected_file.yml'));
});
