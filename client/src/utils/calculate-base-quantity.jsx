import _ from 'lodash';
import api, { MANUAL_TRANSACTIONS } from '../api';

const calcBaseQuantity = async (base, type) => {
  // decide the calc type: LT, L15, KG
  let amount = 0;
  if (type === 'LT') {
    amount = base?.qty_amb;
  } else if (type === 'L15') {
    amount = base?.qty_cor;
  } else if (type === 'KG') {
    amount = base?.load_kg;
  } else {
    type = 'LT';
    amount = base?.qty_amb;
  }

  const response = await api.post(MANUAL_TRANSACTIONS.CALCULATE, {
    frm_baseCd: base?.base_code,
    frm_which_type: type,
    frm_real_amount: amount,
    frm_real_temp: base?.base_temp,
    frm_real_dens: base?.base_dens,
  });

  if (!response?.data?.real_litre) {
    base.result = false;
    base.message = response?.data?.msg_code + ': ' + response?.data?.msg_desc + ' [' + base?.base_code + ']';
  } else {
    base.result = true;
    if (type === 'LT') {
      base.qty_cor = _.toNumber(response?.data?.real_litre15);
      base.load_kg = _.toNumber(response?.data?.real_kg);
    }
    if (type === 'L15') {
      base.qty_amb = _.toNumber(response?.data?.real_litre);
      base.load_kg = _.toNumber(response?.data?.real_kg);
    }
    if (type === 'KG') {
      base.qty_amb = _.toNumber(response?.data?.real_litre);
      base.qty_cor = _.toNumber(response?.data?.real_litre15);
    }
  }
  console.log('----------Utils: calcBaseQuantity', type, base);

  return base;
}
  
export default calcBaseQuantity;
