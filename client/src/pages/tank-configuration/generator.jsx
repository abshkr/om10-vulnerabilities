import _ from 'lodash';

const generator = (data, t) => {
  const payload = [];

  _.forEach(data, (object) => {
    object.tank_density = _.toNumber(object.tank_density);
    object.tank_tol_unit =
      object?.base_gainloss_unit === '1'
        ? `${t('units.mass')}: ${t('units.kg')}`
        : `${t('units.volume')}: ${t('units.litres')}`;

    payload.push(object);
  });

  return payload;
};
export default generator;
