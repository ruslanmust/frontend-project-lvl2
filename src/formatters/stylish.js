const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (data, treeDepth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) { return null; }
  const lines = Object
    .entries(data)
    .map((item) => {
      const [key, value] = item;
      return `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`;
    });
  return [
    '{',
    ...lines,
    `${indent(treeDepth)}  }`,
  ].join('\n');
};

const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const styleString = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'added':
        return styleString(node.val, '+');
      case 'deleted':
        return styleString(node.val, '-');
      case 'exist':
        return styleString(node.val, ' ');
      case 'new':
        return `${styleString(node.val1, '-')}${styleString(node.val2, '+')}`;
      case 'object':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Incorrect type: ${node.type}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
