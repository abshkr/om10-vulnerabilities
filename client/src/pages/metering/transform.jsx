import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, unit) => {
  const payload = _.map(data, object => {
    object.observedvolume = unitConverter(object.observedvolume, unit);
    object.standardvolume = unitConverter(object.standardvolume, unit);
    object.mass = unitConverter(object.mass, unit);
    return object;
  });

  return payload;
};

export default transform;
