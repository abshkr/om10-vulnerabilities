import _ from 'lodash';
import { unitConverter, massConverter } from '../../utils';

const transform = (data, unit, massUnit, config) => {
  const payload = [];

  _.forEach(data, (object) => {
    const entry = {
      ...object,
      observedvolume: unitConverter(object.observedvolume, unit),
      standardvolume: unitConverter(object.standardvolume, unit),
      mass: massConverter(object.mass, massUnit),
      mass_in_air: massConverter(
        _.round(object.mass - object.standardvolume * config?.airBuoyancyFactor, 3),
        massUnit
      ),
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
