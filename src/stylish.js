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
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case '+':
        return getValue(node.val, '+');
      case '-':
        return getValue(node.val, '-');
      case 'exist':
        return getValue(node.val, ' ');
      case 'new':
        return `${getValue(node.val1, '-')}${getValue(node.val2, '+')}`;
      case 'rec':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Этого типа не существует: ${node.type}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
