import _ from 'lodash';

const adjustProductArms = (arms, prodcmpy, prodcode) => {

  const armsByProd = _.filter(arms, (o) => (
    o.rat_prod_prodcmpy === prodcmpy && o.rat_prod_prodcode === prodcode
  ));

  const basesByArm = {};
  const ratiosByArm = {};
  _.forEach(armsByProd, (o) => {
    if (basesByArm.hasOwnProperty(o.stream_armcode)) {
      basesByArm[o.stream_armcode] += 1;
    } else {
      basesByArm[o.stream_armcode] = 1;
    }
    o.arm_bases = 0;
    if (ratiosByArm.hasOwnProperty(o.stream_armcode)) {
      ratiosByArm[o.stream_armcode] += _.toNumber(o.ratio_value);
    } else {
      ratiosByArm[o.stream_armcode] = 0;
    }
    o.arm_ratios = 0;
  });
  _.forEach(armsByProd, (o) => {
    if (basesByArm.hasOwnProperty(o.stream_armcode)) {
      o.arm_bases = basesByArm[o.stream_armcode];
    } 
    if (ratiosByArm.hasOwnProperty(o.stream_armcode)) {
      o.arm_ratios = ratiosByArm[o.stream_armcode];
    } 
  });

  return armsByProd;
};
  
export default adjustProductArms;
  