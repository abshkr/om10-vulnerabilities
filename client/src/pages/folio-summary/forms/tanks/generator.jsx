import _ from 'lodash';

const generator = data => {
  const payload = [];

  _.forEach(data, object => {
    object.max_temp = 150;
    object.min_temp = -18;

    payload.push(object);
  });

  return payload;
};

export default generator;
