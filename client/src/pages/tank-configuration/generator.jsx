import _ from 'lodash';

const generator = data => {
  const payload = [];

  _.forEach(data, object => {
    object.tank_density = _.toNumber(object.tank_density);

    payload.push(object);
  });

  return payload;
};
export default generator;
