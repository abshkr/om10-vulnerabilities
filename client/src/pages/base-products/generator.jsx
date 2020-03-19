import _ from 'lodash';

const generator = data => {
  const payload = [];

  _.forEach(data, object => {
    object.base_cat = _.toNumber(object.base_cat);
    object.base_tank_count = _.toNumber(object.base_tank_count);
    object.base_class_dens_lo = _.toNumber(object.base_class_dens_lo);
    object.base_class_dens_hi = _.toNumber(object.base_class_dens_hi);
    object.base_class_temp_lo = _.toNumber(object.base_class_temp_lo);
    object.base_class_temp_hi = _.toNumber(object.base_class_temp_hi);

    payload.push(object);
  });

  return payload;
};
export default generator;
