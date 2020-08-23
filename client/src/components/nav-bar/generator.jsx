import _ from 'lodash';

import { generatePaths } from '../../utils';

const generator = (target, t, config) => {
  if (!target || target.trim() === '') {
    return [];
  }

  const data = generatePaths(t);
  const paths = [];
  // auditing, partner, and partnership pages may be turned off by features
  _.forEach(data, (o) => {
    if (o.name !== t('pageNames.auditingData') && 
    o.name !== t('pageNames.partners') && 
    o.name !== t('pageNames.partnership')) {
      paths.push(o);
    } else {
      if (o.name === t('pageNames.auditingData') && config.manageAuditing) {
        paths.push(o);
      }
      if (o.name === t('pageNames.partners') && config.managePartnersAndPartnership) {
        paths.push(o);
      }
      if (o.name === t('pageNames.partnership') && config.managePartnersAndPartnership) {
        paths.push(o);
      }
    }
  });

  const filtered = [];
  const options = [];

  _.forEach(paths, (value) => {
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
