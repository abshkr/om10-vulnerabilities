import _ from 'lodash';

const generator = data => {
  const payload = [];

  const values = _.filter(data, object => {
    return object.domain_text === object.object_text;
  });

  const filtered = _.filter(data, object => {
    return object.domain_text !== object.object_text;
  });

  _.forEach(values, value => {
    const grouped = _.groupBy(filtered, 'domain_text');
    const child = grouped[value.domain_text];

    if (child) {
      value.children = grouped[value.domain_text];
    }

    payload.push(value);
  });

  return payload;
};

export default generator;
