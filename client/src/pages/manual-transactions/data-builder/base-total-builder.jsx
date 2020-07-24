import _ from 'lodash';
import {calcBaseRatios} from '../../../utils'

const buildBaseTotalsByArm = (prodArms, transfer) => {
  const arms = _.filter(prodArms, (o) => (
    o.stream_armcode === transfer?.trsf_arm_cd && 
    o.rat_prod_prodcmpy === transfer?.trsf_prod_cmpy && 
    o.rat_prod_prodcode === transfer?.trsf_prod_code
  ));

  const bases = [];
  if (arms?.length > 0) {
    const sum_ratios = _.sumBy(arms, (o)=>{return _.toNumber(o.ratio_value)});
    _.forEach(arms, (product) => {
      let ratio_total = product?.ratio_total;
      if (_.toNumber(ratio_total) > sum_ratios) {
        ratio_total = String(sum_ratios);
      }
      bases.push({
        trsf_bs_prodcd_tot: product?.stream_basecode,
        trsf_bs_prodname_tot: `${product?.stream_basecode} - ${product.stream_basename}`,
        trsf_bs_tk_cd_tot: product?.stream_tankcode,
        trsf_bs_prodcls_tot: product.stream_bclass_nmae,
        trsf_bs_den_tot: product?.stream_tankden,
        trsf_bs_temp_tot: transfer?.trsf_temp,
        trsf_bs_qty_amb_tot: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total),
        trsf_bs_qty_cor_tot: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total),
        trsf_bs_load_kg_tot: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total),
        trsf_bs_adtv_flag_tot: product?.adtv_flag,
        trsf_bs_ratio_value_tot: product?.ratio_value,
        trsf_bs_ratio_total_tot: ratio_total,
        trsf_bs_ratio_total2_tot: product?.ratio_total,
        is_updated: false,
      });
    });
  }

  return bases;
};

const buildBaseTotalsByTransfers = (prodArms, transfers) => {
  let bases = [];
  for (let index = 0; index < transfers.length; index++) {
    const transfer = transfers[index];

    if (!transfer?.trsf_arm_cd.includes(' ')) {
      const armBases = buildBaseTotalsByArm(prodArms, transfer);
      bases = _.concat(bases, armBases);
    }
  }

  return bases;
};

const buildBaseTotals = (prodArms, transfers) => {
  const items = buildBaseTotalsByTransfers(prodArms, transfers);

  const totals = [];
  console.log('buildBaseTotals - start', items);
  let itemExisted = false;

  _.forEach(items, (item) => {
    itemExisted = false;
    for (let index = 0; index < totals.length; index++) {
      const total = totals[index];
      if (total.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot && total.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot) {
        total.trsf_bs_qty_amb_tot = _.toNumber(total.trsf_bs_qty_amb_tot) + _.toNumber(item.trsf_bs_qty_amb_tot);
        total.trsf_bs_qty_cor_tot = _.toNumber(total.trsf_bs_qty_cor_tot) + _.toNumber(item.trsf_bs_qty_cor_tot);
        total.trsf_bs_load_kg_tot = _.toNumber(total.trsf_bs_load_kg_tot) + _.toNumber(item.trsf_bs_load_kg_tot);
        total.trsf_bs_temp_tot = null;
        totals[index] = total;
        itemExisted = true;
      }
    }
    if (!itemExisted) {
      totals.push(item);
    }
  });
  console.log('buildBaseTotals - end', totals);

  return totals;
};

export default buildBaseTotals;
