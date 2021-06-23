import _ from 'lodash';

const generator = (data) => {
  const payload = [];

  _.forEach(data, (object) => {
    object.meter_basecode = object?.meter_basecode2;
    object.meter_basename = object?.meter_basename2;

    payload.push(object);
  });

  return payload;
};

export default generator;
