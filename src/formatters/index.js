import nested from './nested.js';
import plain from './plain.js';

export default (innerTree, formatName) => {
  switch (formatName) {
    case 'nested':
      return nested(innerTree);
    case 'plain':
      return plain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Incorrect format: ${formatName}`);
  }
};
