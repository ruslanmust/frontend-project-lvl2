import fs from 'fs';
import YAML from 'yaml';

const parseJSON = (file) => JSON.parse(fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }));
const parseYAML = (file) => YAML.parse(fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }));

export {
  parseJSON,
  parseYAML,
};
