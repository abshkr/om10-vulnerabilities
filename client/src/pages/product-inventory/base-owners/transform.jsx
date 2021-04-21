import _ from 'lodash';
import { unitConverter } from '../../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, (object) => {
    const entry = {
      ...object,
      ownship_qty: unitConverter(object.ownship_qty, unit),
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
