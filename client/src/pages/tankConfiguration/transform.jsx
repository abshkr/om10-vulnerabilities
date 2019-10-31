import _ from 'lodash';

const transform = data => {
  const payload = _.map(data, object => {
    if (object.tank_dtol_volume !== '') {
      object.tank_dtol_volume = _.toInteger(object.tank_dtol_volume);
    }

    if (object.tank_dtol_percent !== '') {
      object.tank_dtol_percent = _.toInteger(object.tank_dtol_percent);
    }

    if (object.tank_mtol_volume !== '') {
      object.tank_mtol_volume = _.toInteger(object.tank_mtol_volume);
    }

    if (object.tank_mtol_percent !== '') {
      object.tank_mtol_percent = _.toInteger(object.tank_mtol_percent);
    }

    return object;
  });

  return payload;
};

export default transform;
