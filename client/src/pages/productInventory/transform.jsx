import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = _.map(data, object => {
    console.log(unitConverter(object.bookbalance));
    object.bookbalance = unitConverter(object.bookbalance, unit);
    object.grossvol = unitConverter(object.grossvol, unit);
    object.netvol = unitConverter(object.netvol, unit);
    object.usablevol = unitConverter(object.usablevol, unit);

    return object;
  });

  return payload;
};

export default transform;
