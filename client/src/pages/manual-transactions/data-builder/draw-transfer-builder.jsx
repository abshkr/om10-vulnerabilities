import _ from 'lodash';
import {calcArmDensity, getAvailableArms, adjustProductArms} from '../../../utils'

const buildDrawTransfersByArm = (record, productArms, t) => {
    let prodClnValue = t('placeholder.selectDrawerProduct');
    let armClnValue = t('placeholder.selectArmCode');
    let densClnValue = null;
    if (record?.prod_name !== '' && record?.prod_name !== undefined) {
      prodClnValue = record?.prod_desc;
      const items = getAvailableArms(productArms, record?.shls_supp, record?.prod_code);
      if (items?.length === 0) {
        armClnValue = t('placeholder.noArmAvailable');
      }
      if (items?.length > 0) {
        armClnValue = items?.[0]?.stream_armcode;
        const prodArms = adjustProductArms(productArms, record?.shls_supp, record?.prod_code);
        console.log('....................buildDrawTransfersByArm', items?.[0]?.stream_index, items?.[0]?.stream_armcode, prodArms);
        densClnValue = calcArmDensity(items?.[0]?.stream_index, prodArms);
      }
    }

    const transfer = {
      trsf_sold_to: record?.customer_code,
      trsf_delv_num: record?.delivery_number,
      trsf_delv_loc: record?.delivery_location,
      trsf_equip_id: record?.eqpt_code,
      trsf_cmpt_no: record?.tnkr_cmpt_no,
      trsf_cmpt_capacit: record?.cmpt_capacit,
      trsf_drwr_cd: record?.shls_supp,
      trsf_prod_code: record?.prod_code,
      trsf_prod_name: prodClnValue,
      trsf_prod_cmpy: record?.shls_supp,
      trsf_arm_cd: armClnValue,
      trsf_qty_plan: record?.allowed_qty === '' ? null : record?.allowed_qty,
      //trsf_qty_left: record?.allowed_qty==='' ? null : String(_.toNumber(record?.allowed_qty) - _.toNumber(record?.load_qty)),
      trsf_qty_left: record?.load_qty === '' ? null : record?.load_qty,
      trsf_density: densClnValue,
      trsf_temp: null,
      trsf_qty_amb: null,
      trsf_qty_cor: null,
      trsf_load_kg: null,
    };

    return transfer;
};

const buildDrawTransfers = (records, productArms, t) => {
    const transfers = [];

    _.forEach(records, (record) => {
      // console.log('buildDrawTransfers', record?.shls_supp);
      if (record.shls_supp !== '') {
        // console.log('buildDrawTransfers', record, record?.shls_supp, record?.prod_code);
        const transfer = buildDrawTransfersByArm(record, productArms, t);

        transfers.push(transfer);
      }
    });

    return transfers;
};

// export default buildDrawTransfers;
export {
  buildDrawTransfersByArm,
  buildDrawTransfers
};