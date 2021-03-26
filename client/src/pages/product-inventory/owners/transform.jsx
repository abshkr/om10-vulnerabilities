import _ from 'lodash';
import { unitConverter } from '../../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, (object) => {
    const entry = {
      ...object,
      tkowner_qty: unitConverter(object.tkowner_qty, unit),
      tko_std_ltr: unitConverter(object.tko_std_ltr, unit),
      tko_amb_ltr: unitConverter(object.tko_amb_ltr, unit),
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
