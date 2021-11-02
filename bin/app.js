#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import compare from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(compare(filepath1, filepath2));
  });
program.parse(process.argv);
