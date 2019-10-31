import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = _.map(data, object => {
    object.openingstock = unitConverter(object.openingstock, unit);
    object.receiptsvol = unitConverter(object.receiptsvol, unit);
    object.accnttot = unitConverter(object.accnttot, unit);
    object.transfervol = unitConverter(object.transfervol, unit);
    object.bookbalance = unitConverter(object.bookbalance, unit);
    object.closingstock = unitConverter(object.closingstock, unit);
    object.gainloss = unitConverter(object.gainloss, unit);
    return object;
  });

  return payload;
};

export default transform;
