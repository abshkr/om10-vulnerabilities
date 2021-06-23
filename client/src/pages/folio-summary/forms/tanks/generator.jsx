import _ from 'lodash';

const generator = (data) => {
  const payload = [];

  _.forEach(data, (object) => {
    object.max_temp = 500;
    object.min_temp = -50;
    object.tank_basecode = object?.tank_basecode2;
    object.tank_basename = object?.tank_basename2;

    payload.push(object);
  });

  return payload;
};

export default generator;
