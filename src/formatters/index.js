import stylish from './stylish.js';
import plain from './plain.js';

export default (innerTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(innerTree);
    case 'plain':
      return plain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Incorrect format: ${formatName}`);
  }
};
