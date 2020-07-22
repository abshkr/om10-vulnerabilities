import _ from 'lodash';
import adjustProductArms from './adjust-product-arms';

const getAvailableArms = (arms, prodcmpy, prodcode) => {
  const armsByProd = adjustProductArms(arms, prodcmpy, prodcode);

  const items = _.filter(armsByProd, (o) => (
    o.stream_bclass_code !== '6' && String(o.arm_bases) === o.rat_count
  ));

  return items;
};
  
export default getAvailableArms;
  