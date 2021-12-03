const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return null;
  }
  return `${value}`;
};

const plain = (innerTree) => {
  const iter = (nodes, parent) => nodes
    .filter((node) => node.type !== 'exist')
    .map((node) => {
      const prop = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${prop}' was added with value: ${stringify(node.val)}`;
        case 'deleted':
          return `Property '${prop}' was removed`;
        case 'new':
          return `Property '${prop}' was updated. From ${stringify(node.val1)} to ${stringify(node.val2)}`;
        case 'object':
          return `${iter(node.children, prop)}`;
        default:
          throw new Error(`Incorrect type: ${node.type}`);
      }
    }).join('\n');
  return iter(innerTree, false);
};

export default plain;
