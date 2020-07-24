import _ from 'lodash';
import {calcBaseRatios} from '../../../utils'

const buildBaseTransfersByArm = (prodArms, transfer) => {
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
        trsf_bs_cmpt_no: transfer?.trsf_cmpt_no,
        trsf_bs_prodcd: product?.stream_basecode,
        trsf_bs_prodname: `${product?.stream_basecode} - ${product.stream_basename}`,
        trsf_bs_tk_cd: product?.stream_tankcode,
        trsf_bs_prodcls: product.stream_bclass_nmae,
        trsf_bs_den: product?.stream_tankden,
        trsf_bs_temp: transfer?.trsf_temp,
        trsf_bs_qty_amb: calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total),
        trsf_bs_qty_cor: calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total),
        trsf_bs_load_kg: calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total),
        trsf_bs_adtv_flag: product?.adtv_flag,
        trsf_bs_ratio_value: product?.ratio_value,
        trsf_bs_ratio_total: ratio_total,
        trsf_bs_ratio_total2: product?.ratio_total,
        is_updated: false,
      });
    });
  }

  return bases;
};

const buildBaseTransfers = (prodArms, transfers) => {
  let bases = [];
  for (let index = 0; index < transfers.length; index++) {
    const transfer = transfers[index];

    if (!transfer?.trsf_arm_cd.includes(' ')) {
      const armBases = buildBaseTransfersByArm(prodArms, transfer);
      bases = _.concat(bases, armBases);
    }
  }

  return bases;
};

export default buildBaseTransfers;
