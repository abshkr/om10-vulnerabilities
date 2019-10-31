import _ from 'lodash';

const transform = data => {
  const payload = _.map(data, object => {
    return object;
  });

  return payload;
};

export default transform;
