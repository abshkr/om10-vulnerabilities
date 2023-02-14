import _ from 'lodash';
import { adjustMeterTotals } from './meter-total-builder';

const buildPayloadToRepost = (transaction) => {
  const values = {};

  values.trans_type = 'SCHEDULE';
  // values.order_no = transaction?.ORDER_TRIP_IND;
  // values.order_cust_no = transaction?.ORDER_TRIP_IND;
  values.trip_no = transaction?.trsa_trip;
  values.supplier = transaction?.trsa_supplier;
  values.drawer = transaction?.trsa_drawer;
  values.carrier = transaction?.trsa_carrier;
  values.tanker = transaction?.trsa_tanker;
  values.driver = transaction?.trsa_per_name;
  values.start_date = transaction?.trsa_st_dmy;
  values.end_date = transaction?.trsa_ed_dmy;
  // values.customer = transaction?.CUSTOMER;
  // values.load_security = transaction?.TAS_REF;
  // values.user_comments = transaction?.USER_COMMENTS;
  // values.seal_range = transaction?.SEAL_RANGE;
  // values.mt_mngr_oo = transaction?.MT_MNGR_OO;
  // values.mt_cust_code = transaction?.MT_CUST_CODE;
  // values.mt_delv_loc = transaction?.MT_DELV_LOC;
  // values.mt_delv_num = transaction?.MT_DELV_NUM;

  // get transfers, base_transfers & meter_transfers
  values.transfers = [];
  values.base_transfers = [];
  values.meter_transfers = [];

  let tidx = 0;
  let midx = 0;
  let bidx = 0;
  let tcount = 0;
  let bcount = 0;
  let mcount = 0;
  tcount = transaction?.transfers?.length;
  if (tcount === undefined) {
    tcount = 0;
  }
  for (tidx = 0; tidx < tcount; tidx++) {
    const titem = transaction?.transfers?.[tidx];
    const transfer = {};
    /*
      Available fields in transfer level:
        field: 'trsf_cmpt_no',
        field: 'trsf_sold_to',
        field: 'trsf_delv_num',
        field: 'trsf_delv_loc',
        field: 'trsf_equip_id',
        field: 'trsf_drwr_cd',
        field: 'trsf_prod_code',
        field: 'trsf_prod_cmpy',
        field: 'trsf_prod_name',
        field: 'trsf_arm_cd',
        field: 'trsf_qty_plan',
        field: 'trsf_qty_left',
        field: 'trsf_density',
        field: 'trsf_temp',
        field: 'trsf_qty_amb',
        field: 'trsf_qty_cor',
        field: 'trsf_load_kg',
        field: 'trsf_cmpt_capacit',
      */
    transfer.trsf_cmpt_no = titem?.trsf_cmpt_no;
    // transfer.trsf_delv_num = titem?.DELV_NUM;
    transfer.trsf_arm_cd = titem?.trsf_baa_code;
    transfer.trsf_drwr_cd = transaction?.trsa_drawer;
    transfer.trsf_prod_cmpy = transaction?.trsa_supplier;
    transfer.trsf_prod_code = titem?.trsfprod_prodcode;
    transfer.trsf_density = titem?.trsf_density;
    transfer.trsf_temp = titem?.trsf_temp;
    transfer.trsf_qty_amb = titem?.trsf_qty_amb;
    transfer.trsf_qty_cor = titem?.trsf_qty_cor;
    transfer.trsf_load_kg = titem?.trsf_load_kg;
    transfer.trsf_equip_id = titem?.eqpt_code;
    transfer.trsf_qty_plan = titem?.trsf_qty_amb; //titem?.PLANNED_QTY;
    // transfer.trsf_qty_left = titem?.AVAIL_QTY;
    transfer.trsf_cmpt_capacit = titem?.trsf_cmpt_capacit;
    transfer.trsf_prod_name = titem.trsfprod_prodcode + ' - ' + titem.prod_name;
    // transfer.trsf_sold_to = titem?.SOLD_TO;
    // transfer.trsf_delv_loc = titem?.SHIP_TO;

    values.transfers.push(transfer);

    bcount = titem?.base_prods?.length;
    if (bcount === undefined) {
      bcount = 0;
    }
    for (bidx = 0; bidx < bcount; bidx++) {
      const bitem = titem?.base_prods?.[bidx];
      const base = {};
      /*
        Available fields in base product level:
          field: 'trsf_bs_cmpt_no',
          field: 'trsf_bs_prodcd',
          field: 'trsf_bs_prodname',
          field: 'trsf_bs_tk_cd',
          field: 'trsf_bs_prodcls',
          field: 'trsf_bs_prodcls_code',
          field: 'trsf_bs_tank_temp',
          field: 'trsf_bs_den',
          field: 'trsf_bs_temp',
          field: 'trsf_bs_qty_amb',
          field: 'trsf_bs_qty_cor',
          field: 'trsf_bs_load_kg',
          field: 'trsf_bs_adtv_flag',
          field: 'trsf_bs_ratio_value',
          field: 'trsf_bs_ratio_total',
          field: 'trsf_bs_ratio_total2',
        */
      base.trsf_bs_tk_cd = bitem?.trsb_tk_tankcode;
      base.trsf_bs_prodcd = bitem?.base_code;
      base.trsf_bs_prodcls = bitem?.base_cat; //????
      base.trsf_bs_prodcls_code = bitem?.base_cat;
      base.trsf_bs_tank_temp = bitem?.trsb_tmp;
      base.trsf_bs_den = bitem?.trsb_dns;
      base.trsf_bs_temp = bitem?.trsb_tmp;
      base.trsf_bs_qty_amb = bitem?.trsb_avl;
      base.trsf_bs_qty_cor = bitem?.trsb_cvl;
      base.trsf_bs_load_kg = bitem?.trsb_kg;
      // base.trsf_bs_ratio_value = bitem?.BASE_RATIO;
      // base.trsf_bs_ratio_total = bitem?.BASE_RATIO_TOTAL;
      // base.trsf_bs_ratio_total2 = bitem?.BASE_RATIO_TOTAL2;
      base.trsf_bs_adtv_flag = bitem?.base_cat === '6' ? true : false;
      base.trsf_bs_prodname = bitem?.base_code + ' - ' + bitem?.base_name;
      base.trsf_bs_cmpt_no = titem?.trsf_cmpt_no;

      values.base_transfers.push(base);
    }

    mcount = titem?.meters?.length;
    if (mcount === undefined) {
      mcount = 0;
    }
    //mcount = titem?.NUMBER_OF_METERS;
    for (midx = 0; midx < mcount; midx++) {
      const mitem = titem?.meters?.[midx];
      const meter = {};
      /*
        Available fields inn meter level
          field: 'trsf_cmpt_no',
          field: 'trsf_mtr_cd',
          field: 'injector_or_meter',
          field: 'trsf_mtr_typ',
          field: 'trsf_mtr_opn_amb',
          field: 'trsf_mtr_cls_amb',
          field: 'trsf_mtr_opn_cor',
          field: 'trsf_mtr_cls_cor',
          field: 'trsf_mtr_open_kg',
          field: 'trsf_mtr_close_kg',
        */
      meter.trsf_mtr_opn_amb = mitem?.trsb_opn_amb;
      meter.trsf_mtr_opn_cor = mitem?.trsb_opn_cor;
      meter.trsf_mtr_open_kg = mitem?.trsb_opn_kg;
      meter.trsf_mtr_cls_amb = mitem?.trsb_cls_amb;
      meter.trsf_mtr_cls_cor = mitem?.trsb_cls_cor;
      meter.trsf_mtr_close_kg = mitem?.trsb_cls_kg;
      // meter.injector_or_meter = mitem?.INJECTOR_OR_METER;
      meter.trsf_mtr_cd = mitem?.trsb_meter;
      meter.trsf_cmpt_no = titem?.trsf_cmpt_no;
      // meter.trsf_mtr_typ = mitem?.METER_TYPE;

      values.meter_transfers.push(meter);
    }
  }

  // get base_totals
  /*
        Available fields in base product totals level:
        field: 'trsf_bs_prodcd_tot',
        field: 'trsf_bs_prodname_tot',
        field: 'trsf_bs_tk_cd_tot',
        field: 'trsf_bs_prodcls_tot',
        field: 'trsf_bs_prodcls_code_tot',
        field: 'trsf_bs_tank_temp_tot',
        field: 'trsf_bs_den_tot',
        field: 'trsf_bs_temp_tot',
        field: 'trsf_bs_qty_amb_tot',
        field: 'trsf_bs_qty_cor_tot',
        field: 'trsf_bs_load_kg_tot',
        field: 'trsf_bs_adtv_flag_tot',
        field: 'trsf_bs_ratio_value_tot',
        field: 'trsf_bs_ratio_total_tot',
        field: 'trsf_bs_ratio_total2_tot',
    */
  values.base_totals = [];
  let itemExisted = false;
  _.forEach(values?.base_transfers, (item) => {
    itemExisted = false;
    for (let index = 0; index < values?.base_totals?.length; index++) {
      const total = values?.base_totals?.[index];
      if (
        total?.trsf_bs_prodcd_tot === item?.trsf_bs_prodcd &&
        total?.trsf_bs_tk_cd_tot === item?.trsf_bs_tk_cd
      ) {
        total.trsf_bs_qty_amb_tot =
          _.toNumber(total?.trsf_bs_qty_amb_tot) + _.toNumber(item?.trsf_bs_qty_amb);
        total.trsf_bs_qty_cor_tot =
          _.toNumber(total?.trsf_bs_qty_cor_tot) + _.toNumber(item?.trsf_bs_qty_cor);
        total.trsf_bs_load_kg_tot =
          _.toNumber(total?.trsf_bs_load_kg_tot) + _.toNumber(item?.trsf_bs_load_kg);
        total.trsf_bs_temp_tot = null;
        values.base_totals[index] = total;
        itemExisted = true;
      }
    }
    if (!itemExisted) {
      item.trsf_bs_temp_tot = null;
      values.base_totals.push({
        trsf_bs_prodcd_tot: item?.trsf_bs_prodcd,
        trsf_bs_prodname_tot: item?.trsf_bs_prodname,
        trsf_bs_tk_cd_tot: item?.trsf_bs_tk_cd,
        trsf_bs_prodcls_tot: item?.trsf_bs_prodcls,
        trsf_bs_prodcls_code_tot: item?.trsf_bs_prodcls_code,
        trsf_bs_tank_temp_tot: item?.trsf_bs_tank_temp,
        trsf_bs_den_tot: item?.trsf_bs_den,
        trsf_bs_temp_tot: item?.trsf_bs_temp,
        trsf_bs_qty_amb_tot: item?.trsf_bs_qty_amb,
        trsf_bs_qty_cor_tot: item?.trsf_bs_qty_cor,
        trsf_bs_load_kg_tot: item?.trsf_bs_load_kg,
        trsf_bs_adtv_flag_tot: item?.trsf_bs_adtv_flag,
        trsf_bs_ratio_value_tot: item?.trsf_bs_ratio_value,
        trsf_bs_ratio_total_tot: item?.trsf_bs_ratio_total,
        trsf_bs_ratio_total2_tot: item?.trsf_bs_ratio_total2,
      });
    }
  });

  // get meter_totals
  /*
        Available fields inn meter totals level
        //field: 'trsf_cmpt_no',
        field: 'trsf_mtr_cd',
        field: 'injector_or_meter',
        field: 'trsf_mtr_typ',
        field: 'trsf_mtr_opn_amb',
        field: 'trsf_mtr_cls_amb',
        field: 'trsf_mtr_opn_cor',
        field: 'trsf_mtr_cls_cor',
        field: 'trsf_mtr_open_kg',
        field: 'trsf_mtr_close_kg',
    */
  values.meter_totals = adjustMeterTotals(values?.meter_transfers);

  return values;
};

export default buildPayloadToRepost;
