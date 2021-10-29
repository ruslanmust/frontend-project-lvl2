import fs from 'fs';

export default (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1, { encoding: 'utf8', flag: 'r' }));
  const file2 = JSON.parse(fs.readFileSync(filepath2, { encoding: 'utf8', flag: 'r' }));

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const commonKeys = keysFile1.concat(keysFile2.filter((key) => !keysFile1.includes(key))).sort();

  const cb = (acc, item) => {
    if (file1[item] === file2[item]) {
      acc[`  ${item}`] = file1[item];
    }
    if (file1[item] !== file2[item]) {
      acc[`- ${item}`] = file1[item];
      acc[`+ ${item}`] = file2[item];
    }
    return acc;
  };

  const compareItems = commonKeys.reduce(cb, {});
  const str = JSON.stringify(compareItems, null, 2);

  console.log(str.replace(/['"]+/g, ''));
};
