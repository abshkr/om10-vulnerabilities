import _ from 'lodash';

const generator = (data, nullToZero) => {
  const payload = [];

  _.forEach(data, (object) => {
    object.max_temp = 500;
    object.min_temp = -50;
    object.tank_basecode = object?.tank_basecode2;
    object.tank_basename = object?.tank_basename2;

    /*
      The following are the columns related to quantity
      field: 'close_amb_tot',
      field: 'close_std_tot',
      field: 'close_mass_tot',
      field: 'close_mass_tot_air',
      field: 'close_vcf_tot',
      field: 'tank_prod_lvl',
      field: 'tank_water_lvl',
      field: 'tank_ifc',
      field: 'close_temp',
      field: 'close_density',
      Only are some of them required to show ZERO when it is NULL in database
    */
    if (nullToZero) {
      // please note: due to some specific logic in PHP, the NULL column of numeric type will not return to GUI, so most likely it is undefined
      object.close_amb_tot =
        object?.close_amb_tot === null || object?.close_amb_tot === undefined ? 0 : object?.close_amb_tot;
      object.close_std_tot =
        object?.close_std_tot === null || object?.close_std_tot === undefined ? 0 : object?.close_std_tot;
      object.close_mass_tot =
        object?.close_mass_tot === null || object?.close_mass_tot === undefined ? 0 : object?.close_mass_tot;
      // console.log('..................', object.tank_code, object);
    } else {
      // no conversion
    }

    payload.push(object);
  });

  return payload;
};

export default generator;
