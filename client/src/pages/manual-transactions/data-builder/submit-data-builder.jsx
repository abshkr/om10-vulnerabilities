import _ from 'lodash';
// import moment from 'moment';
import { SETTINGS } from '../../../constants';

const buildPayloadToSubmit = (values, sourceType, orderSeals, t) => {
    const payload = {};
    const qtyFactor = 1000;

    payload.supplier = values?.supplier;
    if (sourceType === 'SCHEDULE') {
      payload.trip_no = values?.trip_no;
    } else {
      payload.order_cust_no = values?.order_no;
    }
    payload.tanker = values?.tanker;
    // console.log('...........buildPayloadToSubmit', values);
    // console.log('...........buildPayloadToSubmit', values?.start_date);
    // console.log('...........buildPayloadToSubmit', values?.end_date);
    /* if (values?.start_date === null || values?.start_date === undefined) {
      payload.start_time = moment().format(SETTINGS.DATE_TIME_FORMAT);
    } else {
      payload.start_time = values?.start_date?.format(SETTINGS.DATE_TIME_FORMAT);
    }
    if (values?.end_date === null || values?.end_date === undefined) {
      payload.end_time = moment().format(SETTINGS.DATE_TIME_FORMAT);
    } else {
      payload.end_time = values?.end_date?.format(SETTINGS.DATE_TIME_FORMAT);
    } */
    payload.start_time = values?.start_date?.format(SETTINGS.DATE_TIME_FORMAT);
    payload.end_time = values?.end_date?.format(SETTINGS.DATE_TIME_FORMAT);
    payload.load_security = values?.load_security;
    payload.seal_range = values?.seal_range;

    let tidx = 0;
    let midx = 0;
    let bidx = 0;
    payload.transfers = [];
    for (tidx = 0; tidx < values?.transfers?.length; tidx++) {
      const titem = values?.transfers?.[tidx];

      if (titem.trsf_arm_cd === t('placeholder.selectArmCode') || titem.trsf_arm_cd === t('placeholder.noArmAvailable')) {
        continue;
      }

      if ((!titem.trsf_qty_amb && titem.trsf_qty_amb!==0) || !titem.trsf_density || !titem.trsf_qty_amb || !titem.trsf_qty_cor || !titem.trsf_load_kg) {
        // continue;
      }

      const transfer = {};
      transfer.nr_in_tkr = titem.trsf_cmpt_no;
      transfer.arm_code = titem.trsf_arm_cd;
      transfer.drawer_code = titem.trsf_drwr_cd;
      transfer.product_code = titem.trsf_prod_code;
      transfer.dens = titem.trsf_density;
      transfer.temperature = titem.trsf_temp;
      transfer.amb_vol = titem.trsf_qty_amb;
      transfer.cor_vol = titem.trsf_qty_cor;
      transfer.liq_kg = titem.trsf_load_kg;

      transfer.meters = [];
      // meter for transfers, should use meter_transfers
      for (midx = 0; midx < values?.meter_transfers?.length; midx++) {
        const mitem = values?.meter_transfers?.[midx];
        if (titem.trsf_cmpt_no === mitem.trsf_cmpt_no) {
          const meter = {};
          meter.open_amb = mitem.trsf_mtr_opn_amb * qtyFactor;
          meter.open_cor = mitem.trsf_mtr_opn_cor * qtyFactor;
          meter.open_kg = mitem.trsf_mtr_open_kg * qtyFactor;
          meter.close_amb = mitem.trsf_mtr_cls_amb * qtyFactor;
          meter.close_cor = mitem.trsf_mtr_cls_cor * qtyFactor;
          meter.close_kg = mitem.trsf_mtr_close_kg * qtyFactor;
          meter.injector_or_meter = mitem.injector_or_meter;
          meter.meter_injector_code = mitem.trsf_mtr_cd;
          transfer.meters.push(meter);
        }
      }

      transfer.bases = [];
      for (bidx = 0; bidx < values?.base_transfers?.length; bidx++) {
        const bitem = values?.base_transfers?.[bidx];
        if (titem.trsf_cmpt_no === bitem.trsf_bs_cmpt_no) {
          const base = {};
          base.tank_code = bitem.trsf_bs_tk_cd;
          base.base_code = bitem.trsf_bs_prodcd;
          base.base_class = bitem.trsf_bs_prodcls;
          base.base_class_code = bitem.trsf_bs_prodcls_code;
          base.dens = bitem.trsf_bs_den;
          base.temperature = bitem.trsf_bs_temp;
          base.amb_vol = bitem.trsf_bs_qty_amb;
          base.cor_vol = bitem.trsf_bs_qty_cor;
          base.liq_kg = bitem.trsf_bs_load_kg;
          transfer.bases.push(base);
        }
      }

      payload.transfers.push(transfer);
    }

    if (sourceType === 'OPENORDER') {
      payload.seals = orderSeals;
    }
    /* "seals" : [
      {
          "seal_nr": "123",
          "cmpt_nr": 1,
          "seal_prefix": "pre",
          "seal_suffix": "suffix"
      }
    ] */

    return payload;
};

export default buildPayloadToSubmit;
