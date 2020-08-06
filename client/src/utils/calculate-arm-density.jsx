import _ from 'lodash';
import calcBaseRatios from './calculate-base-ratios';

const calcArmDensity = (armcode, values) => {
    let index = undefined;
    let armDens = 0.0;
    const sum_ratios = _.sumBy(values, (o)=>{
      if (o.stream_armcode === armcode) {
        return _.toNumber(o.ratio_value);
      }
    });

    // calculate drawer product density
    for (index = 0; index < values.length; index++) {
      const item = values[index];
      if (item.stream_armcode === armcode) {
        let ratio_total = item?.ratio_total;
        if (_.toNumber(ratio_total) > sum_ratios) {
          ratio_total = String(sum_ratios);
        }
        armDens = armDens + calcBaseRatios(item?.stream_tankden, item?.ratio_value, ratio_total);
      }
    }

    return armDens;
};
  
export default calcArmDensity;
  