import _ from 'lodash';
import moment from 'moment';
import { SETTINGS } from '../../../constants';

const buildPayloadToSave = (values, customers, sourceType, repost, user_code, save_format, t) => {
  const payload = {};

  // php API need this field to verify but the actual value will be created by a DB trigger
  payload.gud_id = 999999999;
  payload.gud_module_id = 'MANUAL_TRANSACTIONS';
  payload.gud_module_name = 'Manual Transactions';

  const mthead = {};
  mthead.TRANSACTION_TYPE = sourceType === 'SCHEDULE' ? 'S' : 'O';
  mthead.ORDER_TRIP_IND = sourceType === 'OPENORDER' ? values?.order_no : '';
  mthead.LOAD_NUMBER = sourceType === 'SCHEDULE' ? values?.trip_no : '';
  mthead.SUPPLIER = values?.supplier;
  mthead.DRAWER = values?.drawer;
  mthead.CARRIER = values?.carrier;
  mthead.TANKER_CODE = values?.tanker;
  mthead.OPERATOR_CODE = values?.driver;
  mthead.START_TIME = values?.start_date?.format(SETTINGS.DATE_TIME_FORMAT);
  mthead.FINISH_TIME = values?.end_date?.format(SETTINGS.DATE_TIME_FORMAT);
  mthead.CUSTOMER = values?.customer; // Customer Account
  //console.log('mthead.CUSTOMER_CODE', _.find(customers?.records, (o)=>(o.customer === values?.customer)));
  //console.log('mthead.CUSTOMER_CODE', _.find(customers?.records, (o)=>(o.customer === values?.customer))?.company);
  mthead.CUSTOMER_CODE = !values?.customer
    ? ''
    : _.find(customers?.records, (o) => o.customer === values?.customer)?.company;
  mthead.TAS_REF = values?.load_security;
  mthead.USER_COMMENTS = values?.user_comments;
  mthead.SEAL_RANGE = values?.seal_range;
  mthead.SCHD_SUB_TYPE = '';
  mthead.TRANSACTION_REPOST = repost ? '1' : '0';
  mthead.MT_MNGR_OO = values?.mt_mngr_oo;
  mthead.MT_CUST_CODE = values?.mt_cust_code;
  mthead.MT_DELV_LOC = values?.mt_delv_loc;
  mthead.MT_DELV_NUM = values?.mt_delv_num;
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
  mthead.CM_BASE_STD_MASS_TOTAL_DISP =
    'Base Std Total:' + String(_.round(stdQty, 3)) + '    Base Mass Total:' + String(_.round(massQty, 3));
  mthead.CM_NEED_REFRESH_BP_TOTAL = '0'; // ACC_BASE_ADJ the base prod total array collection needs refresh flag
  mthead.CM_IS_ACC_BASE_ADJUSTED = '0'; // ACC_BASE_ADJ the Acc Base adjusted flag

  payload.gud_head_data = mthead;

  const mtbody = {};
  mtbody.TRNASFERS = {};
  mtbody.TRNASFERS.TRANSFER = [];

  let tidx = 0;
  let midx = 0;
  let bidx = 0;
  for (tidx = 0; tidx < values?.transfers?.length; tidx++) {
    const titem = values?.transfers?.[tidx];

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
    transfer.NR_IN_TKR = titem.trsf_cmpt_no;
    transfer.DELV_NUM = titem.trsf_delv_num;
    transfer.ARM_CODE =
      titem.trsf_arm_cd === t('placeholder.selectArmCode') ||
      titem.trsf_arm_cd === t('placeholder.noArmAvailable')
        ? ''
        : titem.trsf_arm_cd;
    transfer.DRAWER_CODE = titem.trsf_drwr_cd;
    transfer.SUPPLIER_CODE = titem.trsf_prod_cmpy;
    transfer.PRODUCT_CODE =
      titem.trsf_prod_code === t('placeholder.selectDrawerProduct') ? '' : titem.trsf_prod_code;
    transfer.DENS = titem.trsf_density;
    transfer.TEMPERATURE = titem.trsf_temp;
    transfer.AMB_VOL = titem.trsf_qty_amb;
    transfer.COR_VOL = titem.trsf_qty_cor;
    transfer.LIQ_KG = titem.trsf_load_kg;
    transfer.AIR_KG = titem.trsf_air_kg;
    transfer.PROD_VCF = titem.trsf_vcf;
    transfer.EQUIPMENT_ID = titem.trsf_equip_id;
    transfer.PLANNED_QTY = titem.trsf_qty_plan;
    transfer.AVAIL_QTY = titem.trsf_qty_left;
    transfer.CAPACITY = titem.trsf_cmpt_capacit;
    transfer.PRODUCT_NAME = titem.trsf_prod_name;
    transfer.SOLD_TO = titem.trsf_sold_to;
    transfer.SHIP_TO = titem.trsf_delv_loc;
    const baseCount = _.filter(values?.base_transfers, (o) => titem.trsf_cmpt_no === o.trsf_bs_cmpt_no)
      ?.length;
    const meterCount = _.filter(values?.meter_transfers, (o) => titem.trsf_cmpt_no === o.trsf_cmpt_no)
      ?.length;
    transfer.NUMBER_OF_BASES = baseCount;
    transfer.NUMBER_OF_METERS = meterCount;

    if (baseCount > 0) {
      transfer.BASEPROD = [];
      for (bidx = 0; bidx < values?.base_transfers?.length; bidx++) {
        const bitem = values?.base_transfers?.[bidx];
        if (titem.trsf_cmpt_no === bitem.trsf_bs_cmpt_no) {
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
          base.TANK_CODE = bitem.trsf_bs_tk_cd;
          base.PRODUCT_CODE = bitem.trsf_bs_prodcd;
          base.PROD_CLASS = bitem.trsf_bs_prodcls;
          base.PROD_CLASS_CODE = bitem.trsf_bs_prodcls_code;
          base.TANK_TEMP = bitem.trsf_bs_tank_temp;
          base.DENS = bitem.trsf_bs_den;
          base.TEMPERATURE = bitem.trsf_bs_temp;
          base.AMB_VOL = bitem.trsf_bs_qty_amb;
          base.COR_VOL = bitem.trsf_bs_qty_cor;
          base.LIQ_KG = bitem.trsf_bs_load_kg;
          base.AIR_KG = bitem.trsf_bs_air_kg;
          base.BASE_VCF = bitem.trsf_bs_vcf;
          base.BASE_RATIO = bitem.trsf_bs_ratio_value;
          base.BASE_RATIO_TOTAL = bitem.trsf_bs_ratio_total;
          base.BASE_RATIO_TOTAL2 = bitem.trsf_bs_ratio_total2;
          base.IS_ADDITIVE = bitem.trsf_bs_adtv_flag;
          base.PRODUCT_NAME = bitem.trsf_bs_prodname;
          base.BASE_CMPT_NO = bitem.trsf_bs_cmpt_no;

          transfer.BASEPROD.push(base);
        }
      }
    }

    if (meterCount > 0) {
      transfer.METER = [];
      // meters for transfer, should use meter_transfers
      for (midx = 0; midx < values?.meter_transfers?.length; midx++) {
        const mitem = values?.meter_transfers?.[midx];
        if (titem.trsf_cmpt_no === mitem.trsf_cmpt_no) {
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
          meter.OPEN_AMB = mitem.trsf_mtr_opn_amb;
          meter.OPEN_COR = mitem.trsf_mtr_opn_cor;
          meter.OPEN_KG = mitem.trsf_mtr_open_kg;
          meter.CLOSE_AMB = mitem.trsf_mtr_cls_amb;
          meter.CLOSE_COR = mitem.trsf_mtr_cls_cor;
          meter.CLOSE_KG = mitem.trsf_mtr_close_kg;
          meter.INJECTOR_OR_METER = mitem.injector_or_meter;
          meter.METER_INJECTOR_CODE = mitem.trsf_mtr_cd;
          meter.METER_CMPT_NO = mitem.trsf_cmpt_no;
          meter.METER_TYPE = mitem.trsf_mtr_typ;

          transfer.METER.push(meter);
        }
      }
    }

    mtbody.TRNASFERS.TRANSFER.push(transfer);
  }

  mtbody.BASEPRODTOTALS = {};
  mtbody.BASEPRODTOTALS.BASEPRODTOTAL = [];
  for (bidx = 0; bidx < values?.base_totals?.length; bidx++) {
    const bitem = values?.base_totals?.[bidx];
    const base = {};
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
    base.TANK_CODE = bitem.trsf_bs_tk_cd_tot;
    base.PRODUCT_CODE = bitem.trsf_bs_prodcd_tot;
    base.PROD_CLASS = bitem.trsf_bs_prodcls_tot;
    base.PROD_CLASS_CODE = bitem.trsf_bs_prodcls_code_tot;
    base.TANK_TEMP = bitem.trsf_bs_tank_temp_tot;
    base.DENS = bitem.trsf_bs_den_tot;
    base.TEMPERATURE = bitem.trsf_bs_temp_tot;
    base.AMB_VOL = bitem.trsf_bs_qty_amb_tot;
    base.COR_VOL = bitem.trsf_bs_qty_cor_tot;
    base.LIQ_KG = bitem.trsf_bs_load_kg_tot;
    base.BASE_RATIO = bitem.trsf_bs_ratio_value_tot;
    base.BASE_RATIO_TOTAL = bitem.trsf_bs_ratio_total_tot;
    base.BASE_RATIO_TOTAL2 = bitem.trsf_bs_ratio_total2_tot;
    base.IS_ADDITIVE = bitem.trsf_bs_adtv_flag_tot;
    base.PRODUCT_NAME = bitem.trsf_bs_prodname_tot;

    mtbody.BASEPRODTOTALS.BASEPRODTOTAL.push(base);
  }

  mtbody.METERTOTALS = {};
  mtbody.METERTOTALS.METERTOTAL = [];
  for (midx = 0; midx < values?.meter_totals?.length; midx++) {
    const mitem = values?.meter_totals?.[midx];
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
    meter.OPEN_AMB = mitem.trsf_mtr_opn_amb;
    meter.OPEN_COR = mitem.trsf_mtr_opn_cor;
    meter.OPEN_KG = mitem.trsf_mtr_open_kg;
    meter.CLOSE_AMB = mitem.trsf_mtr_cls_amb;
    meter.CLOSE_COR = mitem.trsf_mtr_cls_cor;
    meter.CLOSE_KG = mitem.trsf_mtr_close_kg;
    meter.INJECTOR_OR_METER = mitem.injector_or_meter;
    meter.METER_INJECTOR_CODE = mitem.trsf_mtr_cd;
    //meter.METER_CMPT_NO = mitem.trsf_cmpt_no;
    meter.METER_TYPE = mitem.trsf_mtr_typ;

    mtbody.METERTOTALS.METERTOTAL.push(meter);
  }

  payload.gud_body_data = mtbody;

  payload.gud_user = user_code;
  payload.gud_create_date = moment().format(SETTINGS.DATE_TIME_FORMAT);
  payload.gud_update_date = '';
  payload.gud_status = 'N';

  payload.gud_head_data = JSON.stringify(payload.gud_head_data);
  payload.gud_body_data = JSON.stringify(payload.gud_body_data);
  payload.save_format = save_format;

  return payload;
};

export default buildPayloadToSave;
