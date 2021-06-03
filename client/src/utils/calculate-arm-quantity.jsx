import _ from 'lodash';
import calcBaseRatios from './calculate-base-ratios';
import calcBaseQuantity from './calculate-base-quantity';

const calcArmQuantity = async (armcode, arms, amount, type, temperature) => {
  let index = undefined;
  const sum_ratios = _.sumBy(arms, (o) => {
    if (o.stream_armcode === armcode) {
      return _.toNumber(o.ratio_value);
    }
  });
  console.log('----- utils: calcArmQuantity', armcode, arms, amount, type, temperature);
  const transfer = {
    qty_amb: type === 'LT' ? amount : 0,
    qty_cor: type === 'L15' ? amount : 0,
    load_kg: type === 'KG' ? amount : 0,
    bases: [],
    result: true,
  };
  // calculate base product quantity
  const bases = [];
  for (index = 0; index < arms.length; index++) {
    const item = arms[index];
    if (item.stream_armcode === armcode) {
      let ratio_total = item?.ratio_total;
      if (_.toNumber(ratio_total) > sum_ratios) {
        ratio_total = String(sum_ratios);
      }

      const base_qty = calcBaseRatios(amount, item?.ratio_value, ratio_total);

      const base = {};
      base.base_tank = item?.stream_tankcode;
      base.base_code = item?.stream_basecode;
      base.base_temp = temperature;
      base.base_dens = item?.stream_tankden;
      base.qty_amb = type === 'LT' ? base_qty : 0;
      base.qty_cor = type === 'L15' ? base_qty : 0;
      base.load_kg = type === 'KG' ? base_qty : 0;

      const newbase = await calcBaseQuantity(base, type);
      // there will be base_vcf in return object newbase
      bases.push(newbase);
    }
  }

  transfer.bases = bases;

  // calculate drawer product quantity
  for (index = 0; index < bases.length; index++) {
    const base = bases[index];
    if (base.result) {
      transfer.qty_amb = _.toNumber(transfer.qty_amb) + (type !== 'LT' ? base.qty_amb : 0);
      transfer.qty_cor = _.toNumber(transfer.qty_cor) + (type !== 'L15' ? base.qty_cor : 0);
      transfer.load_kg = _.toNumber(transfer.load_kg) + (type !== 'KG' ? base.load_kg : 0);
    } else {
      transfer.qty_amb = type === 'LT' ? amount : 0;
      transfer.qty_cor = type === 'L15' ? amount : 0;
      transfer.load_kg = type === 'KG' ? amount : 0;
      transfer.message = base.message;
      transfer.result = base.result;
      break;
    }
  }
  transfer.prod_vcf =
    _.toNumber(transfer.qty_amb) <= 0 ? 0 : _.toNumber(transfer.qty_cor) / _.toNumber(transfer.qty_amb);

  return transfer;
};

export default calcArmQuantity;
