import _ from 'lodash';
import { calcArmDensity, getAvailableArms, adjustProductArms } from '../../../utils';

const buildDrawTransfersByArm = (record, productArms, t, sourceType, loadType, repost) => {
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
      // console.log('....................buildDrawTransfersByArm', items?.[0]?.stream_index, items?.[0]?.stream_armcode, prodArms);
      densClnValue = calcArmDensity(items?.[0]?.stream_armcode, prodArms);
    }
  }

  // let qtyOnboard = record?.allowed_qty==='' ? null : String(_.toNumber(record?.allowed_qty) - _.toNumber(record?.load_qty));
  // let qtyOnboard = record?.load_qty === '' ? null : record?.load_qty,
  let qtyOnboard =
    record?.load_qty === '' ? null : record?.load_qty === '0' ? record?.qty_loaded : record?.load_qty;

  let ambDefault = null;
  let corDefault = null;
  let kgDefault = null;
  if (repost) {
    if (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') {
      // check the schedule unit and assign the available qty to proper field !!!!
      // Note: cmpt_units here is actually scheduled unit in compartment
      // Note: allowed_qty (qty scheduled) and qtyOnBoard (qty loaded) are already considered product unit
      // ambDefault = record?.allowed_qty;
      const qtyDefault = String(_.toNumber(record?.allowed_qty) - _.toNumber(qtyOnboard));
      if (record?.cmpt_units === '5') {
        ambDefault = qtyDefault;
      } else if (record?.cmpt_units === '11') {
        corDefault = qtyDefault;
      } else if (record?.cmpt_units === '17') {
        kgDefault = qtyDefault;
      } else {
        ambDefault = qtyDefault;
      }
    } else {
      // check the compartment unit and assign the safefill as available qty to proper field !!!!
      const qtyDefault = record?.cmpt_capacit;
      // ambDefault = String(_.toNumber(record?.cmpt_capacit) - _.toNumber(qtyOnboard));
      if (record?.tc_units === '5') {
        ambDefault = qtyDefault;
      } else if (record?.tc_units === '11') {
        corDefault = qtyDefault;
      } else if (record?.tc_units === '17') {
        kgDefault = qtyDefault;
      } else {
        ambDefault = qtyDefault;
      }
    }
  }

  const transfer = {
    trsf_sold_to: record?.customer_code,
    trsf_delv_num: record?.delivery_number,
    trsf_delv_loc: record?.delivery_location,
    trsf_equip_id: record?.eqpt_code,
    trsf_cmpt_no: record?.tnkr_cmpt_no,
    trsf_cmpt_capacit: record?.cmpt_capacit,
    trsf_cmpt_unit: record?.cmpt_units,
    trsf_tc_unit: record?.tc_units,
    trsf_drwr_cd: record?.shls_drawer, // supp,
    trsf_prod_code: record?.prod_code,
    trsf_prod_name: prodClnValue,
    trsf_prod_cmpy: record?.shls_supp,
    trsf_arm_cd: armClnValue,
    trsf_qty_plan: record?.allowed_qty === '' ? null : record?.allowed_qty,
    // trsf_qty_left: record?.allowed_qty==='' ? null : String(_.toNumber(record?.allowed_qty) - _.toNumber(record?.load_qty)),
    // trsf_qty_left: record?.load_qty === '' ? null : record?.load_qty,
    trsf_qty_left: qtyOnboard,
    trsf_density: densClnValue,
    trsf_temp: null,
    trsf_qty_amb: ambDefault,
    trsf_qty_cor: corDefault,
    trsf_load_kg: kgDefault,
    trsf_bases: [],
  };

  return transfer;
};

const buildDrawTransfers = (records, productArms, t, sourceType, loadType, repost) => {
  const transfers = [];

  _.forEach(records, (record) => {
    // console.log('buildDrawTransfers', record?.shls_supp, record?.shls_drawer);
    if (record.shls_supp !== '' && record.shls_drawer !== '') {
      // console.log('************* buildDrawTransfers', record, record?.shls_supp, record?.shls_drawer, record?.prod_code);
      const transfer = buildDrawTransfersByArm(record, productArms, t, sourceType, loadType, repost);

      transfers.push(transfer);
    }
  });

  return transfers;
};

// export default buildDrawTransfers;
export { buildDrawTransfersByArm, buildDrawTransfers };
