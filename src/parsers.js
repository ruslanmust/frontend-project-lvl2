import YAML from 'yaml';

export default (format, data) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return YAML.parse(data);
    default:
      throw new Error(`Incorrect file extention: ${format}`);
  }
};
