import _ from 'lodash';
import {buildMeterTransfers} from './meter-transfer-builder';

const buildMeterTotals = (prodArms, transfers) => {
  const items = buildMeterTransfers(prodArms, transfers);

  const totals = [];
  console.log('buildMeterTotals - start', items);
  let itemExisted = false;

  _.forEach(items, (item) => {
    itemExisted = false;
    for (let index = 0; index < totals.length; index++) {
      const total = totals[index];
      if (total.trsf_mtr_cd === item.trsf_mtr_cd) {
        // may need adjust metering
        // trsf_mtr_opn_amb
        // trsf_mtr_opn_cor
        // trsf_mtr_open_kg
        // trsf_mtr_cls_amb
        // trsf_mtr_cls_cor
        // trsf_mtr_close_kg
        if (!total.trsf_mtr_opn_amb && !item.trsf_mtr_opn_amb && 
          _.toNumber(total.trsf_mtr_opn_amb) > _.toNumber(item.trsf_mtr_opn_amb)) {
          total.trsf_mtr_opn_amb = item.trsf_mtr_opn_amb;
        }
        if (!total.trsf_mtr_cls_amb && !item.trsf_mtr_cls_amb && 
          _.toNumber(total.trsf_mtr_cls_amb) < _.toNumber(item.trsf_mtr_cls_amb)) {
          total.trsf_mtr_cls_amb = item.trsf_mtr_cls_amb;
        }
        if (!total.trsf_mtr_opn_cor && !item.trsf_mtr_opn_cor && 
          _.toNumber(total.trsf_mtr_opn_cor) > _.toNumber(item.trsf_mtr_opn_cor)) {
          total.trsf_mtr_opn_cor = item.trsf_mtr_opn_cor;
        }
        if (!total.trsf_mtr_cls_cor && !item.trsf_mtr_cls_cor && 
          _.toNumber(total.trsf_mtr_cls_cor) < _.toNumber(item.trsf_mtr_cls_cor)) {
          total.trsf_mtr_cls_cor = item.trsf_mtr_cls_cor;
        }
        if (!total.trsf_mtr_open_kg && !item.trsf_mtr_open_kg && 
          _.toNumber(total.trsf_mtr_open_kg) > _.toNumber(item.trsf_mtr_open_kg)) {
          total.trsf_mtr_open_kg = item.trsf_mtr_open_kg;
        }
        if (!total.trsf_mtr_close_kg && !item.trsf_mtr_close_kg && 
          _.toNumber(total.trsf_mtr_close_kg) < _.toNumber(item.trsf_mtr_close_kg)) {
          total.trsf_mtr_close_kg = item.trsf_mtr_close_kg;
        }
        totals[index] = total;
        itemExisted = true;
      }
    }
    if (!itemExisted) {
      totals.push(item);
    }
  });
  console.log('buildMeterTotals - end', totals);

  return totals;
};

export default buildMeterTotals;
