import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = _.map(data, object => {
    object.netvol = unitConverter(object.netvol, unit);
    object.grossvol = unitConverter(object.grossvol, unit);
    object.pumpablevol = unitConverter(object.pumpablevol, unit);
    object.usablevol = unitConverter(object.usablevol, unit);
    object.bookbalance = unitConverter(object.bookbalance, unit);
    return object;
  });

  return payload;
};

export default transform;
