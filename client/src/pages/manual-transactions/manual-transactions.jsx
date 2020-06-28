import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Form, Radio, Modal, notification, message } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import _ from 'lodash';
import jwtDecode from 'jwt-decode';

import { Page } from '../../components';

import DataManager from './data-manager';
import DataColumns from './data-manager/columns';
import DrawerProductTransfers from './drawer-product-transfer';
import Forms from './forms';
import { SETTINGS } from '../../constants';
import api, { MANUAL_TRANSACTIONS } from '../../api';
import useAuth from 'hooks/use-auth';

const { confirm } = Modal;

const ManualTransactions = ({ popup, params }) => {
  //console.log("params", params);
  const { t } = useTranslation();
  const access = useAuth('M_MANUALTRANSACTIONS');
  const [form] = Form.useForm();

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const user_code = decoded?.per_code;

  const [dataLoaded, setDataLoaded] = useState(null);
  const [dataSaved, setDataSaved] = useState(null);
  const [dataBoard, setDataBoard] = useState({});
  const [repost, setRepost] = useState(false);
  // SCHEDULE: doing manual transaction with Load Schedule
  // OPENORDER: doing manual transaction with Open Order
  const [sourceType, setSourceType] = useState(undefined);
  // BY_PRODUCT: doing manual transaction with Pre-Order
  // BY_COMPARTMENT: doing manual transaction with Pre-Schedule
  const [loadType, setLoadType] = useState(undefined);
  // Store the trip number or open order number
  const [loadNumber, setLoadNumber] = useState(undefined);

  const [trips, setTrips] = useState(null);
  const [tankers, setTankers] = useState(null);
  const [orders, setOrders] = useState(null);

  const [customers, setCustomers] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTanker, setSelectedTanker] = useState(null);

  const resetFormData = () => {
    setLoadType(null);
    setLoadNumber(null);
    setTrips(null);
    setTankers(null);
    setOrders(null);
    setCustomers(null);
    setSelectedSupplier(null);
    setSelectedCustomer(null);
    setSelectedTrip(null);
    setSelectedOrder(null);
    setSelectedTanker(null);
    form.setFieldsValue({
      transfers: [],
      base_transfers: [],
      base_totals: [],
      meter_transfers: [],
      meter_totals: [],
    });
  };

  const preparePayloadToSubmit = (values) => {
    const payload = {};

    payload.supplier = values?.supplier;
    if (sourceType === 'SCHEDULE') {
      payload.trip_no = values?.trip_no;
    } else {
      payload.order_cust_no = values?.order_no;
    }
    payload.tanker = values?.tanker;
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

      if (titem.trsf_arm_cd === t('placeholder.selectArmCode')) {
        continue;
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
          meter.open_amb = mitem.trsf_mtr_opn_amb;
          meter.open_cor = mitem.trsf_mtr_opn_cor;
          meter.open_kg = mitem.trsf_mtr_open_kg;
          meter.close_amb = mitem.trsf_mtr_cls_amb;
          meter.close_cor = mitem.trsf_mtr_cls_cor;
          meter.close_kg = mitem.trsf_mtr_close_kg;
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

    /* if (sourceType === 'OPENORDER') {
      payload.seals = [];
      payload.seals.push({
        seal_nr: '',
        cmpt_nr: 1,
        seal_prefix: 'pre',
        seal_suffix: 'suffix'
      });
    } */
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

  const onSubmit = () => {
    Modal.confirm({
      title: t('prompts.submit'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        try {
          const values = await form.validateFields();
          console.log('await values', values);
          await api
            .post(MANUAL_TRANSACTIONS.SUBMIT, preparePayloadToSubmit(values))
            .then((response) => {
              setSourceType(null);
              resetFormData();

              notification.success({
                message: t('messages.submitSuccess'),
                description: t('descriptions.submitSuccess'),
              });
            })

            .catch((error) => {
              notification.error({
                message: error.message,
                description: t('descriptions.submitFailed'),
              });
            });
        } catch (error) {
          message.error({
            key: 'submit',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  const onReset = () => {
    confirm({
      title: 'Are you sure reset this Transaction?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Reset',
      okType: 'danger',
      centered: true,
      cancelText: 'No',
      onOk: async () => {
        await form.resetFields();

        setSourceType(null);
        resetFormData();
      },
    });
  };

  const prepareValuesToLoad = (payload) => {
    const values = {};

    const mthead = payload.gud_head_data;

    values.source_type = mthead?.TRANSACTION_TYPE === 'S' ? 'SCHEDULE' : 'OPENORDER';
    values.order_no = mthead?.ORDER_TRIP_IND;
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

  const loadMTData = (value) => {
    api
      .get(MANUAL_TRANSACTIONS.READ_MT_DATA, {
        params: {
          seq_id: value?.mt_id,
        },
      })
      .then((res) => {
        console.log(res.data?.records);
        const record = res.data?.records?.[0];
        if (record.gud_head_data !== '' && record.gud_head_data !== null && record.gud_head_data !== false) {
          record.gud_head_data = JSON.parse(_.replace(record.gud_head_data, '{}', '""'));
        }
        if (record.gud_body_data !== '' && record.gud_body_data !== null && record.gud_body_data !== false) {
          record.gud_body_data = JSON.parse(_.replace(record.gud_body_data, '{}', '""'));
        }

        setDataLoaded(record);
        console.log('DataLoaded', record);

        const values = prepareValuesToLoad(record);
        console.log('prepareValuesToLoad', values);
        setDataLoaded(values);

        /* form.setFieldsValue({
        transfers: values?.transfers,
        base_transfers: values?.base_transfers,
        base_totals: values?.base_totals,
        meter_transfers: values?.meter_transfers,
        meter_totals: values?.meter_totals,
      }) */

        console.log('set form fields done!');
      });
  };

  const onLoad = () => {
    DataManager(t('fields.mtDataTitle'), DataColumns(t), null, loadMTData, '80vw', '40vh');
  };

  const preparePayloadToSave = (values, save_format) => {
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
      transfer.ARM_CODE = titem.trsf_arm_cd === t('placeholder.selectArmCode') ? '' : titem.trsf_arm_cd;
      transfer.DRAWER_CODE = titem.trsf_drwr_cd;
      transfer.PRODUCT_CODE =
        titem.trsf_prod_code === t('placeholder.selectDrawerProduct') ? '' : titem.trsf_prod_code;
      transfer.DENS = titem.trsf_density;
      transfer.TEMPERATURE = titem.trsf_temp;
      transfer.AMB_VOL = titem.trsf_qty_amb;
      transfer.COR_VOL = titem.trsf_qty_cor;
      transfer.LIQ_KG = titem.trsf_load_kg;
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
            base.DENS = bitem.trsf_bs_den;
            base.TEMPERATURE = bitem.trsf_bs_temp;
            base.AMB_VOL = bitem.trsf_bs_qty_amb;
            base.COR_VOL = bitem.trsf_bs_qty_cor;
            base.LIQ_KG = bitem.trsf_bs_load_kg;
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

    setDataSaved(payload);

    payload.gud_head_data = JSON.stringify(payload.gud_head_data);
    payload.gud_body_data = JSON.stringify(payload.gud_body_data);
    payload.save_format = save_format;

    return payload;
  };

  const onSave = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      content: (
        <Form form={form} initialValues={{ save_format: 'JSON' }}>
          <Form.Item name="save_format">
            <Radio.Group style={{ width: '30vw', marginBottom: 10, marginTop: 10 }}>
              <Radio value="JSON">JSON</Radio>
              <Radio value="XML">XML</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        try {
          const save_format = form.getFieldValue('save_format');
          const values = await form.validateFields();
          console.log('await values', values);
          console.log('data board', dataBoard);
          await api
            .post(MANUAL_TRANSACTIONS.SAVE_MT_DATA, preparePayloadToSave(values, save_format))
            .then((response) => {
              //setSourceType(null);
              //resetFormData();

              notification.success({
                message: t('messages.saveSuccess'),
                description: t('descriptions.saveSuccess'),
              });
            })

            .catch((error) => {
              notification.error({
                message: error.message,
                description: t('descriptions.saveFailed'),
              });
            });
        } catch (error) {
          message.error({
            key: 'save',
            content: t('descriptions.validationFailed'),
          });
        }
      },
    });
  };

  useEffect(() => {
    console.log('MT entry page sourceType', sourceType);
    resetFormData();
  }, [sourceType]);

  useEffect(() => {
    if (params && popup && !repost) {
      setRepost(params?.repost);
    }
  }, [popup, params, repost]);

  /* useEffect(() => {
    if (params && popup) {
      form.setFieldsValue({
        source_type: params?.trans_type,
        supplier: params?.supplier,
        customer: params?.customer,
        order_no: params?.order_cust_no,
        trip_no: params?.trip_no,
      });
      setSourceType(params?.trans_type);
      setSelectedSupplier(params?.supplier);
      setSelectedCustomer(params?.customer);
      setSelectedOrder(params?.order_cust_no);
      setSelectedTrip(params?.trip_no);
    }
  }, [popup, params]); */

  const modifiers = (
    <>
      <Button type="primary" icon={<SyncOutlined />} onClick={onLoad}>
        {t('operations.load')}
      </Button>

      <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
        {t('operations.save')}
      </Button>

      <Button type="danger" icon={<DeleteOutlined />} onClick={onReset}>
        {t('operations.clear')}
      </Button>

      <Button type="primary" icon={<PlusOutlined />} onClick={onSubmit}>
        {t('operations.submit')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.manualTransactions')}
      modifiers={modifiers}
      standalone={popup}
      access={access}
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Forms
          form={form}
          dataBoard={dataBoard}
          setDataBoard={setDataBoard}
          sourceType={sourceType}
          setSourceType={setSourceType}
          loadType={loadType}
          setLoadType={setLoadType}
          loadNumber={loadNumber}
          setLoadNumber={setLoadNumber}
          trips={trips}
          setTrips={setTrips}
          tankers={tankers}
          setTankers={setTankers}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
          setCustomers={setCustomers}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          selectedTrip={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          setSelectedTanker={setSelectedTanker}
          params={params}
          popup={popup}
          dataLoaded={null}
        />

        <DrawerProductTransfers
          form={form}
          dataBoard={dataBoard}
          setDataBoard={setDataBoard}
          sourceType={sourceType}
          loadType={loadType}
          loadNumber={loadNumber}
          supplier={selectedSupplier}
          trip={selectedTrip}
          order={selectedOrder}
          tanker={selectedTanker}
          repost={repost}
          dataLoaded={dataLoaded}
        />
      </Form>
    </Page>
  );
};

//export default auth(ManualTransactions);
export default ManualTransactions;
