import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, object => {
    const entry = {
      ...object,
      bookbalance: unitConverter(object.bookbalance, unit),
      grossvol: unitConverter(object.grossvol, unit),
      netvol: unitConverter(object.netvol, unit),
      usablevol: unitConverter(object.usablevol, unit)
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
