import _ from 'lodash';
import { calcBaseRatios } from '../../../utils';

const buildBaseTransfer = (product, transfer, sum_ratios) => {
  let ratio_total = product?.ratio_total;
  if (_.toNumber(ratio_total) > sum_ratios) {
    ratio_total = String(sum_ratios);
  }
  const trsf_base = _.find(
    transfer?.trsf_bases,
    (o) => o.base_code === product?.stream_basecode && o.base_tank === product?.stream_tankcode
  );
  let amb = 0;
  let cor = 0;
  let mass = 0;
  let base_vcf = 0;
  // console.log('...............buildBaseTransfer', transfer, transfer?.trsf_bases, trsf_base,)
  if (!trsf_base) {
    // no base calc result found, use ratios
    amb = calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total);
    cor = calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total);
    mass = calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total);
    base_vcf = amb <= 0 ? 0 : cor / amb;
  } else {
    // base calc result found and use them directly
    amb = trsf_base?.qty_amb;
    cor = trsf_base?.qty_cor;
    mass = trsf_base?.load_kg;
    base_vcf = trsf_base?.base_vcf;
  }
  const base = {
    trsf_bs_cmpt_no: transfer?.trsf_cmpt_no,
    trsf_bs_prodcd: product?.stream_basecode,
    trsf_bs_prodname: `${product?.stream_basecode} - ${product.stream_basename}`,
    trsf_bs_tk_cd: product?.stream_tankcode,
    trsf_bs_prodcls: product.stream_bclass_nmae,
    trsf_bs_prodcls_code: product?.stream_bclass_code,
    trsf_bs_tank_temp: product?.base_rpt_temp,
    trsf_bs_den: product?.stream_tankden,
    trsf_bs_temp: transfer?.trsf_temp,
    trsf_bs_qty_amb: amb, // calcBaseRatios(transfer?.trsf_qty_amb, product?.ratio_value, ratio_total),
    trsf_bs_qty_cor: cor, // calcBaseRatios(transfer?.trsf_qty_cor, product?.ratio_value, ratio_total),
    trsf_bs_load_kg: mass, // calcBaseRatios(transfer?.trsf_load_kg, product?.ratio_value, ratio_total),
    trsf_bs_vcf: base_vcf,
    trsf_bs_adtv_flag: product?.adtv_flag,
    trsf_bs_ratio_value: product?.ratio_value,
    trsf_bs_ratio_total: ratio_total,
    trsf_bs_ratio_total2: product?.ratio_total,
    is_updated: false,
  };

  return base;
};

const buildBaseTransfersByArm = (prodArms, transfer) => {
  const arms = _.filter(
    prodArms,
    (o) =>
      o.stream_armcode === transfer?.trsf_arm_cd &&
      o.rat_prod_prodcmpy === transfer?.trsf_prod_cmpy &&
      o.rat_prod_prodcode === transfer?.trsf_prod_code
  );

  const bases = [];
  if (arms?.length > 0) {
    const sum_ratios = _.sumBy(arms, (o) => {
      return _.toNumber(o.ratio_value);
    });
    _.forEach(arms, (product) => {
      /* let ratio_total = product?.ratio_total;
      if (_.toNumber(ratio_total) > sum_ratios) {
        ratio_total = String(sum_ratios);
      }
      bases.push({
        trsf_bs_cmpt_no: transfer?.trsf_cmpt_no,
        trsf_bs_prodcd: product?.stream_basecode,
        trsf_bs_prodname: `${product?.stream_basecode} - ${product.stream_basename}`,
        trsf_bs_tk_cd: product?.stream_tankcode,
        trsf_bs_prodcls: product.stream_bclass_nmae,
        trsf_bs_prodcls_code: product?.stream_bclass_code,
        trsf_bs_tank_temp: product?.base_rpt_temp,
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
      }); */
      const base = buildBaseTransfer(product, transfer, sum_ratios);
      // console.log('...................buildBaseTransfersByArm1: ', base?.trsf_bs_temp_tot, transfer?.trsf_temp);
      // console.log('...................buildBaseTransfersByArm2: ', base, transfer, product);
      bases.push(base);
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

// export default buildBaseTransfers;
export { buildBaseTransfer, buildBaseTransfersByArm, buildBaseTransfers };
