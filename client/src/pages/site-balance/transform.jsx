import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = [];

  _.forEach(data, (object) => {
    const entry = {
      ...object,
      openingstock: unitConverter(object.openingstock, unit),
      receiptsvol: unitConverter(object.receiptsvol, unit),
      accnttot: unitConverter(object.accnttot, unit),
      transfervol: unitConverter(object.transfervol, unit),
      bookbalance: unitConverter(object.bookbalance, unit),
      closingstock: unitConverter(object.closingstock, unit),
      gainloss: unitConverter(object.gainloss, unit),
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
