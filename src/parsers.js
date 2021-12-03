import YAML from 'yaml';

export default (extention, fileRead) => {
  switch (extention) {
    case '.json':
      return JSON.parse(fileRead);
    case '.yml':
      return YAML.parse(fileRead);
    default:
      throw new Error(`Incorrect file extention: ${extention}`);
  }
};
