import _ from 'lodash';
import calcBaseRatios from './calculate-base-ratios';
import { SETTINGS } from '../constants';

const calcArmDensity = (armcode, values) => {
  let index = undefined;
  let armDens = 0.0;
  const ignoreAdtv = SETTINGS.GLOBAL_SETTINGS.IGNORE_ADTV_DENS;
  const sum_ratios = _.sumBy(values, (o) => {
    if (o.stream_armcode === armcode) {
      // if ignoreAdtv is false OR the base product is not additive (ignoreAdtv is true), return the ratio for summary
      if (!ignoreAdtv || (String(o.stream_bclass_code) !== '6' && String(o.stream_bclass_code) !== '11')) {
        return _.toNumber(o.ratio_value);
      }
    }
  });
  // calculate drawer product density
  for (index = 0; index < values.length; index++) {
    const item = values[index];
    if (item.stream_armcode === armcode) {
      // console.log('.............................arm density', item, armcode, ignoreAdtv);
      let ratio_total = item?.ratio_total;
      if (_.toNumber(ratio_total) > sum_ratios) {
        ratio_total = String(sum_ratios);
      }
      // if ignoreAdtv is false OR the base product is not additive (ignoreAdtv is true), use the additve density in calculation
      if (
        !ignoreAdtv ||
        (String(item?.stream_bclass_code) !== '6' && String(item?.stream_bclass_code) !== '11')
      ) {
        armDens = armDens + calcBaseRatios(item?.stream_tankden, item?.ratio_value, ratio_total);
      }
    }
  }

  return armDens;
};

export default calcArmDensity;
