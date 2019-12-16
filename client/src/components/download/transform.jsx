import _ from 'lodash';

const transform = (data, columns) => {
  const collection = _.map(data, value => {
    const fields = _.uniq(_.map(columns, 'field'));
    const payload = _.pick(value, fields);

    return payload;
  });

  return collection;
};

export default transform;
