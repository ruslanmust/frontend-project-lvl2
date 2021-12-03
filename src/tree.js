import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const commonKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(commonKeys);

  return sortedKeys.map((key) => {
    const valueobj1 = obj1[key];
    const valueobj2 = obj2[key];
    if (_.isPlainObject(valueobj1) && _.isPlainObject(valueobj2)) {
      return { type: 'object', key, children: buildTree(valueobj1, valueobj2) };
    }
    if (!_.has(obj2, key)) {
      return { type: 'deleted', key, val: valueobj1 };
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, val: valueobj2 };
    }
    if (!_.isEqual(valueobj1, valueobj2)) {
      return {
        type: 'new', key, val1: valueobj1, val2: valueobj2,
      };
    }
    return { type: 'exist', key, val: valueobj1 };
  });
};

export default buildTree;
