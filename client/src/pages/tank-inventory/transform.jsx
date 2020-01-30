import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, object => {
    const entry = {
      ...object,
      netvol: unitConverter(object.netvol, unit),
      grossvol: unitConverter(object.grossvol, unit),
      pumpablevol: unitConverter(object.pumpablevol, unit),
      usablevol: unitConverter(object.usablevol, unit),
      bookbalance: unitConverter(object.bookbalance, unit)
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
