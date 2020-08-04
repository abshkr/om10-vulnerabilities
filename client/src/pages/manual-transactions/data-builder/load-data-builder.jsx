import _ from 'lodash';

const buildPayloadToLoad = (payload, setRepost, t) => {
    const values = {};

    const mthead = payload.gud_head_data;

    values.trans_type = mthead?.TRANSACTION_TYPE === 'S' ? 'SCHEDULE' : 'OPENORDER';
    values.order_no = mthead?.ORDER_TRIP_IND;
    values.order_cust_no = mthead?.ORDER_TRIP_IND;
    values.trip_no = mthead?.LOAD_NUMBER;
    values.supplier = mthead?.SUPPLIER;
    values.carrier = mthead?.CARRIER;
    values.tanker = mthead?.TANKER_CODE;
    values.driver = mthead?.OPERATOR_CODE;
    values.start_date = mthead?.START_TIME;
    values.end_date = mthead?.FINISH_TIME;
    values.customer = mthead?.CUSTOMER;
    values.load_security = mthead?.TAS_REF;
    values.user_comments = mthead?.USER_COMMENTS;
    values.seal_range = mthead?.SEAL_RANGE;
    values.mt_mngr_oo = mthead?.MT_MNGR_OO;
    values.mt_cust_code = mthead?.MT_CUST_CODE;
    values.mt_delv_loc = mthead?.MT_DELV_LOC;
    values.mt_delv_num = mthead?.MT_DELV_NUM;
    setRepost(mthead.TRANSACTION_REPOST === '1' ? true : false);

    /* mthead.SCHD_SUB_TYPE = '';
    // the following requires the calculations of transfer records
    const obsQty = _.sumBy(values?.base_transfers, 'trsf_bs_qty_amb');
    const stdQty = _.sumBy(values?.base_transfers, 'trsf_bs_qty_cor');
    const massQty = _.sumBy(values?.base_transfers, 'trsf_bs_load_kg');
    mthead.CM_BASE_OBS_TOTAL = String(obsQty);
    mthead.CM_BASE_STD_TOTAL = String(stdQty);
    mthead.CM_BASE_MASS_TOTAL = String(massQty);
    mthead.CM_BASE_OBS_TOTAL_DISP = String(_.round(obsQty, 3));
    mthead.CM_BASE_STD_TOTAL_DISP = String(_.round(stdQty, 3));
    mthead.CM_BASE_MASS_TOTAL_DISP = String(_.round(massQty, 3));
    mthead.CM_BASE_STD_MASS_TOTAL_DISP = 'Base Std Total:' + String(_.round(stdQty, 3)) + '    Base Mass Total:' + String(_.round(massQty, 3));
    mthead.CM_NEED_REFRESH_BP_TOTAL = '0'; // ACC_BASE_ADJ the base prod total array collection needs refresh flag
    mthead.CM_IS_ACC_BASE_ADJUSTED = '0'; // ACC_BASE_ADJ the Acc Base adjusted flag */

    const mtbody = payload.gud_body_data;

    values.transfers = [];
    values.base_transfers = [];
    values.meter_transfers = [];

    let tidx = 0;
    let midx = 0;
    let bidx = 0;
    let tcount = 0;
    let bcount = 0;
    let mcount = 0;
    tcount = mtbody?.TRNASFERS?.TRANSFER?.length;
    if (tcount === undefined) {
      tcount = 0;
    }
    for (tidx = 0; tidx < tcount; tidx++) {
      const titem = mtbody?.TRNASFERS?.TRANSFER?.[tidx];
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
      transfer.trsf_cmpt_no = titem?.NR_IN_TKR;
      transfer.trsf_delv_num = titem?.DELV_NUM;
      transfer.trsf_arm_cd = titem?.ARM_CODE === '' ? t('placeholder.selectArmCode') : titem?.ARM_CODE;
      transfer.trsf_drwr_cd = titem?.DRAWER_CODE;
      transfer.trsf_prod_cmpy = titem?.DRAWER_CODE;
      transfer.trsf_prod_code =
        titem?.PRODUCT_CODE === '' ? t('placeholder.selectDrawerProduct') : titem?.PRODUCT_CODE;
      transfer.trsf_density = titem?.DENS;
      transfer.trsf_temp = titem?.TEMPERATURE;
      transfer.trsf_qty_amb = titem?.AMB_VOL;
      transfer.trsf_qty_cor = titem?.COR_VOL;
      transfer.trsf_load_kg = titem?.LIQ_KG;
      transfer.trsf_equip_id = titem?.EQUIPMENT_ID;
      transfer.trsf_qty_plan = titem?.PLANNED_QTY;
      transfer.trsf_qty_left = titem?.AVAIL_QTY;
      transfer.trsf_cmpt_capacit = titem?.CAPACITY;
      transfer.trsf_prod_name = titem?.PRODUCT_NAME;
      transfer.trsf_sold_to = titem?.SOLD_TO;
      transfer.trsf_delv_loc = titem?.SHIP_TO;

      values.transfers.push(transfer);

      bcount = titem?.BASEPROD?.length;
      if (bcount === undefined) {
        bcount = 0;
      }
      //bcount = titem?.NUMBER_OF_BASES;
      for (bidx = 0; bidx < bcount; bidx++) {
        const bitem = titem?.BASEPROD?.[bidx];
        const base = {};
        /*
        Available fields in base product level:
          field: 'trsf_bs_cmpt_no',
          field: 'trsf_bs_prodcd',
          field: 'trsf_bs_prodname',
          field: 'trsf_bs_tk_cd',
          field: 'trsf_bs_prodcls',
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
        base.trsf_bs_tk_cd = bitem?.TANK_CODE;
        base.trsf_bs_prodcd = bitem?.PRODUCT_CODE;
        base.trsf_bs_prodcls = bitem?.PROD_CLASS;
        base.trsf_bs_den = bitem?.DENS;
        base.trsf_bs_temp = bitem?.TEMPERATURE;
        base.trsf_bs_qty_amb = bitem?.AMB_VOL;
        base.trsf_bs_qty_cor = bitem?.COR_VOL;
        base.trsf_bs_load_kg = bitem?.LIQ_KG;
        base.trsf_bs_ratio_value = bitem?.BASE_RATIO;
        base.trsf_bs_ratio_total = bitem?.BASE_RATIO_TOTAL;
        base.trsf_bs_ratio_total2 = bitem?.BASE_RATIO_TOTAL2;
        base.trsf_bs_adtv_flag = bitem?.IS_ADDITIVE;
        base.trsf_bs_prodname = bitem?.PRODUCT_NAME;
        base.trsf_bs_cmpt_no = bitem?.BASE_CMPT_NO;

        values.base_transfers.push(base);
      }

      mcount = titem?.METER?.length;
      if (mcount === undefined) {
        mcount = 0;
      }
      //mcount = titem?.NUMBER_OF_METERS;
      for (midx = 0; midx < mcount; midx++) {
        const mitem = titem?.METER?.[midx];
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
        meter.trsf_mtr_opn_amb = mitem?.OPEN_AMB;
        meter.trsf_mtr_opn_cor = mitem?.OPEN_COR;
        meter.trsf_mtr_open_kg = mitem?.OPEN_KG;
        meter.trsf_mtr_cls_amb = mitem?.CLOSE_AMB;
        meter.trsf_mtr_cls_cor = mitem?.CLOSE_COR;
        meter.trsf_mtr_close_kg = mitem?.CLOSE_KG;
        meter.injector_or_meter = mitem?.INJECTOR_OR_METER;
        meter.trsf_mtr_cd = mitem?.METER_INJECTOR_CODE;
        meter.trsf_cmpt_no = mitem?.METER_CMPT_NO;
        meter.trsf_mtr_typ = mitem?.METER_TYPE;

        values.meter_transfers.push(meter);
      }
    }

    values.base_totals = [];
    bcount = mtbody?.BASEPRODTOTALS?.BASEPRODTOTAL?.length;
    if (bcount === undefined) {
      bcount = 0;
    }
    for (bidx = 0; bidx < bcount; bidx++) {
      const bitem = mtbody?.BASEPRODTOTALS?.BASEPRODTOTAL?.[bidx];
      const base = {};
      /*
      Available fields in base product totals level:
        field: 'trsf_bs_prodcd_tot',
        field: 'trsf_bs_prodname_tot',
        field: 'trsf_bs_tk_cd_tot',
        field: 'trsf_bs_prodcls_tot',
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
      base.trsf_bs_tk_cd_tot = bitem?.TANK_CODE;
      base.trsf_bs_prodcd_tot = bitem?.PRODUCT_CODE;
      base.trsf_bs_prodcls_tot = bitem?.PROD_CLASS;
      base.trsf_bs_den_tot = bitem?.DENS;
      base.trsf_bs_temp_tot = bitem?.TEMPERATURE;
      base.trsf_bs_qty_amb_tot = bitem?.AMB_VOL;
      base.trsf_bs_qty_cor_tot = bitem?.COR_VOL;
      base.trsf_bs_load_kg_tot = bitem?.LIQ_KG;
      base.trsf_bs_ratio_value_tot = bitem?.BASE_RATIO;
      base.trsf_bs_ratio_total_tot = bitem?.BASE_RATIO_TOTAL;
      base.trsf_bs_ratio_total2_tot = bitem?.BASE_RATIO_TOTAL2;
      base.trsf_bs_adtv_flag_tot = bitem?.IS_ADDITIVE;
      base.trsf_bs_prodname_tot = bitem?.PRODUCT_NAME;

      values.base_totals.push(base);
    }

    values.meter_totals = [];
    mcount = mtbody?.METERTOTALS?.METERTOTAL?.length;
    if (mcount === undefined) {
      mcount = 0;
    }
    for (midx = 0; midx < mcount; midx++) {
      const mitem = mtbody?.METERTOTALS?.METERTOTAL?.[midx];
      //console.log(mcount, midx, mitem);
      const meter = {};
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
      meter.trsf_mtr_opn_amb = mitem?.OPEN_AMB;
      meter.trsf_mtr_opn_cor = mitem?.OPEN_COR;
      meter.trsf_mtr_open_kg = mitem?.OPEN_KG;
      meter.trsf_mtr_cls_amb = mitem?.CLOSE_AMB;
      meter.trsf_mtr_cls_cor = mitem?.CLOSE_COR;
      meter.trsf_mtr_close_kg = mitem?.CLOSE_KG;
      meter.injector_or_meter = mitem?.INJECTOR_OR_METER;
      meter.trsf_mtr_cd = mitem?.METER_INJECTOR_CODE;
      //meter.trsf_cmpt_no = mitem?.METER_CMPT_NO;
      meter.trsf_mtr_typ = mitem?.METER_TYPE;
      //console.log(mcount, midx, meter);

      values.meter_totals.push(meter);
    }

    return values;
};

export default buildPayloadToLoad;
