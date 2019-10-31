import _ from 'lodash';

const generateOptions = (data, key, context, text, value) => {
  let results = [];

  _.map(_.uniqBy(data, key), function(item) {
    results.push({
      text: !!item[key] ? item[key] : 'N/A',
      value: !!item[key] ? item[key] : 'null',
    });
  });

  results = _.reject(results, function(o) {
    return o.text === 'N/A';
  });

  if (key === 'user_status_flag') {
    _.forEach(results, (object, key) => {
      if (object.value === '1') {
        return (object.text = 'Active');
      }

      if (object.value === '2') {
        return (object.text = 'Locked');
      }

      if (object.value === '0') {
        return (object.text = 'Inactive');
      }
    });
  }

  if (!!context) {
    _.forEach(results, (object, key) => {
      const index = object.value;

      const item = _.find(context, [text, index]);

      if (!!item) {
        return (object.text = item[value]);
      }
    });
  }

  return results;
};

export default generateOptions;
