import _ from 'lodash';

import { generatePaths } from '../../utils';

const generator = (target, t) => {
  const data = generatePaths(t);

  const filtered = [];
  const options = [];

  _.forEach(data, (value) => {
    const flatMap = _.toArray(value);
    const stringMap = flatMap.toString();

    if (stringMap.toLowerCase().includes(target.toLowerCase()) && target !== '') {
      filtered.push({
        page: value.page,
        value: value.name,
        path: value.path,
      });
    }
  });

  const grouped = _.groupBy(filtered, 'page');

  _.forEach(grouped, (group, key) => {
    options.push({
      label: key,
      options: group,
    });
  });

  return options;
};

export default generator;
