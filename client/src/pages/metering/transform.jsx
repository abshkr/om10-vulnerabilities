import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, object => {
    const entry = {
      ...object,
      observedvolume: unitConverter(object.observedvolume, unit),
      standardvolume: unitConverter(object.standardvolume, unit),
      mass: unitConverter(object.mass, unit)
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
