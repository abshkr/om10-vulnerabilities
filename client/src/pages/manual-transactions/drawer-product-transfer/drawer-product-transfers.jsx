import React, { useState, useEffect } from 'react';
import {
  UndoOutlined,
  DeleteOutlined,
  CopyOutlined,
  ClearOutlined,
  CalculatorOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Tabs, Divider, Card, Row, Col, notification, Modal, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';

import api, { MANUAL_TRANSACTIONS, ORDER_LISTINGS } from '../../../api';
import {
  calcBaseRatios,
  calcArmDensity,
  getAvailableArms,
  adjustProductArms,
  calcArmQuantity,
} from '../../../utils';

import BaseProductTransfers from './base-product-transfers';
import BaseProductTotals from './base-product-totals';
import MeterTransfers from './meter-transfers';
import MeterTotals from './meter-totals';

import {
  buildDrawTransfers,
  buildBaseTransfers,
  buildBaseTotals,
  adjustBaseTotals,
  buildMeterTransfers,
  buildMeterTotals,
} from '../data-builder';

const components = {
  BayArmEditor: BayArm,
  DrawerProductsEditor: DrawerProducts,
  EquipmentEditor: Equipment,
  TemperatureEditor: Temperature,
  ObservedEditor: Observed,
  StandardEditor: Standard,
  MassEditor: Mass,
};

const { TabPane } = Tabs;

const { confirm } = Modal;

const DrawerProductTransfers = ({
  form,
  sourceType,
  loadType,
  loadNumber,
  supplier,
  trip,
  order,
  tanker,
  repost,
  dataBoard,
  setDataBoard,
  payload,
  setPayload,
  dataBaseTransfers,
  setDataBaseTransfers,
  dataBaseTotals,
  setDataBaseTotals,
  dataMeterTransfers,
  setDataMeterTransfers,
  dataMeterTotals,
  setDataMeterTotals,
  dataLoaded,
  setDataLoaded,
  productArms,
  setProductArms,
  drawerChanges,
  setDrawerChanges,
  config,
}) => {
  // console.log('--------------------------', sourceType, supplier, trip, order, tanker);
  const { data: units } = useSWR(ORDER_LISTINGS.UNIT_TYPES);

  const { data } = useSWR(
    (sourceType === 'SCHEDULE' &&
      supplier &&
      trip &&
      tanker &&
      `${MANUAL_TRANSACTIONS.TRIP_DETAILS}?supplier=${supplier}&trip_no=${trip}&new_tanker=${tanker}`) ||
      (sourceType === 'OPENORDER' &&
        supplier &&
        order &&
        tanker &&
        `${MANUAL_TRANSACTIONS.ORDER_DETAILS}?supplier=${supplier}&order_cust_no=${order}&tanker=${tanker}`)
  );

  // By default, SWR uses a global cache to store and share data across all components.
  // When API arguments remain unchanged, SWR will look for the data from Cache first
  // To break this default action, we use a date number as a random index in API arguments.
  const random = React.useRef(Date.now());
  const { data: products } = useSWR(
    (sourceType === 'SCHEDULE' &&
      supplier &&
      trip &&
      `${MANUAL_TRANSACTIONS.TRIP_PRODUCTS}?supplier_code=${supplier}&shls_trip_no=${trip}&trig=${random.current}`) ||
      (sourceType === 'OPENORDER' &&
        supplier &&
        order &&
        `${MANUAL_TRANSACTIONS.ORDER_PRODUCTS}?supplier=${supplier}&order_cust_no=${order}&trig=${random.current}`)
  );

  const { data: transactions } = useSWR(
    sourceType === 'SCHEDULE' &&
      supplier &&
      trip &&
      repost &&
      `${MANUAL_TRANSACTIONS.TRANSACTIONS}?supplier=${supplier}&trip_no=${trip}`
  );

  // const { data: composition } = useSWR(tanker && `${MANUAL_TRANSACTIONS.COMPOSITION}?tnkr_code=${tanker}`);
  const { data: composition } = useSWR(tanker && `${MANUAL_TRANSACTIONS.TANKER_DETAILS}?tanker=${tanker}`);

  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);
  //const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [tableBaseTransfersAPI, setTableBaseTransfersAPI] = useState(null);
  const [tableBaseTotalsAPI, setTableBaseTotalsAPI] = useState(null);
  const [canCopy, setCanCopy] = useState(false);
  const [canCalc, setCanCalc] = useState(false);
  const [canRestore, setCanRestore] = useState(false);
  const [loadingArms, setLoadingArms] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getProductArms = (supplier, products) => {
    setLoadingArms(true);
    const prod_codes = [];
    _.forEach(products, (o) => {
      if (o.prod_cmpy === supplier) {
        prod_codes.push(o.prod_code);
      }
    });

    api
      .get(MANUAL_TRANSACTIONS.GET_PROD_ARMS, {
        params: {
          prod_cmpy: supplier,
          prod_code: prod_codes,
        },
      })
      .then((res) => {
        setProductArms(res.data?.records);
        setLoadingArms(false);
      });
  };

  const refreshProductArms = async (supplier, products) => {
    setLoadingArms(true);
    const prod_codes = [];
    _.forEach(products, (o) => {
      if (o.prod_cmpy === supplier) {
        prod_codes.push(o.prod_code);
      }
    });

    const results = await api.get(MANUAL_TRANSACTIONS.GET_PROD_ARMS, {
      params: {
        prod_cmpy: supplier,
        prod_code: prod_codes,
      },
    });

    // setProductArms(results?.data?.records);
    setLoadingArms(false);

    return results?.data?.records;
  };

  const updateTransferRow = (item) => {
    const payload = [];
    tableAPI.forEachNode((rowNode) => {
      if (rowNode.data.trsf_cmpt_no === item.trsf_cmpt_no) {
        const selected = rowNode.data;
        Object.keys(item).forEach((key) => {
          if (selected.hasOwnProperty(key)) {
            selected[key] = item[key];
          }
        });
        payload.push(selected);
      }
    });
    if (payload.length > 0) {
      tableAPI.updateRowData({ update: payload });
    }
  };

  const updateBaseTransferRow = (item) => {
    const payload = [];
    tableBaseTransfersAPI.forEachNode((rowNode) => {
      if (
        rowNode.data.trsf_bs_cmpt_no === item.trsf_bs_cmpt_no &&
        rowNode.data.trsf_bs_prodcd === item.trsf_bs_prodcd &&
        rowNode.data.trsf_bs_tk_cd === item.trsf_bs_tk_cd
      ) {
        const selected = rowNode.data;
        Object.keys(item).forEach((key) => {
          if (selected.hasOwnProperty(key)) {
            selected[key] = item[key];
          }
        });
        payload.push(selected);
      }
    });
    if (payload.length > 0) {
      tableBaseTransfersAPI.updateRowData({ update: payload });
    }
  };

  const updateBaseTotalRow = (item) => {
    const payload = [];
    tableBaseTotalsAPI.forEachNode((rowNode) => {
      if (
        rowNode.data.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot &&
        rowNode.data.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot
      ) {
        const selected = rowNode.data;
        Object.keys(item).forEach((key) => {
          if (selected.hasOwnProperty(key)) {
            selected[key] = item[key];
          }
        });
        payload.push(selected);
      }
    });
    if (payload.length > 0) {
      tableBaseTotalsAPI.updateRowData({ update: payload });
    }
  };

  const retrieveTransfers = () => {
    const payload = [];
    tableAPI.forEachNode((rowNode) => {
      const selected = rowNode.data;
      payload.push(selected);
    });
    return payload;
  };

  const retrieveBaseTransfers = () => {
    const payload = [];
    tableBaseTransfersAPI.forEachNode((rowNode) => {
      const selected = rowNode.data;
      payload.push(selected);
    });
    return payload;
  };

  const retrieveBaseTotals = () => {
    const payload = [];
    tableBaseTotalsAPI.forEachNode((rowNode) => {
      const selected = rowNode.data;
      payload.push(selected);
    });
    return payload;
  };

  const getPrevTransactionsForRepost = (transactions) => {
    const notReversed = _.filter(transactions, (o) => o.trsa_reverse_flag === false);
    if (notReversed?.length === 0) {
      return null;
    } else if (notReversed?.length === 1) {
      return notReversed?.[0];
    } else {
      // The trip has been reversed and reposted for multiple times
      // find the last non-reversed transaction which must have the maximium transaction ID
      const sorted = _.sortBy(notReversed, (o) => o.trsa_id);
      return sorted?.[sorted?.length - 1];
    }
  };

  const getPrevTransaction = (transactions, composition) => {
    const transaction = getPrevTransactionsForRepost(transactions?.records);
    // get tanker compartment number
    _.forEach(transaction?.transfers, (item) => {
      const cmpt = _.find(
        composition?.records,
        (o) => o.eqpt_code === item.eqpt_code && o.cmpt_no === item.trsf_trailercomp
      );
      if (cmpt !== undefined) {
        item.trsf_cmpt_unit = cmpt.cmpt_units;
        item.trsf_cmpt_no = cmpt.tnkr_cmpt;
        item.trsf_cmpt_capacit =
          cmpt.adj_capacity > cmpt.adj_safefill ? cmpt.adj_safefill : cmpt.adj_capacity;
      }
      // console.log('---------- check repost transactions0', cmpt, item);
    });
    // console.log('---------- check repost transactions', transaction);
    return transaction;
  };

  // for repost transactions
  const updateDrawerProductTransfers = (transfers, transaction) => {
    _.forEach(transfers, (item) => {
      // get the matched transfer from transaction
      const cmpt = _.find(
        transaction?.transfers,
        (o) => o.eqpt_code === item.trsf_equip_id && o.trsf_cmpt_no === item.trsf_cmpt_no
      );
      if (cmpt !== undefined) {
        // item.trsf_equip_id = cmpt.eqpt_code;
        // item.trsf_cmpt_no = cmpt.trsf_cmpt_no;
        // item.trsf_cmpt_capacit = cmpt.trsf_cmpt_capacit;
        item.trsf_drwr_cd = transaction.trsa_drawer;
        item.trsf_prod_code = cmpt.trsfprod_prodcode;
        item.trsf_prod_name = cmpt.trsfprod_prodcode + ' - ' + cmpt.prod_name;
        item.trsf_prod_cmpy = transaction.trsa_supplier;
        item.trsf_arm_cd = cmpt.trsf_baa_code;
        if (!item.trsf_qty_plan) {
          if (cmpt.trsf_cmpt_unit === '5') {
            item.trsf_qty_plan = cmpt.trsf_qty_amb;
          } else if (cmpt.trsf_cmpt_unit === '11') {
            item.trsf_qty_plan = cmpt.trsf_qty_cor;
          } else if (cmpt.trsf_cmpt_unit === '17') {
            item.trsf_qty_plan = cmpt.trsf_load_kg;
          } else {
            item.trsf_qty_plan = cmpt.trsf_qty_amb;
          }
        }
        // item.trsf_qty_left = cmpt.;
        item.trsf_density = cmpt.trsf_density;
        item.trsf_temp = cmpt.trsf_temp;
        item.trsf_qty_amb = cmpt.trsf_qty_amb;
        item.trsf_qty_cor = cmpt.trsf_qty_cor;
        item.trsf_load_kg = cmpt.trsf_load_kg;
      }
      // console.log('---------- updateDrawerProductTransfers', cmpt, item);
    });

    return transfers;
  };

  const updateProductArms = (arms, transaction) => {
    // get all bases from transaction
    const repostBases = [];
    _.forEach(transaction?.transfers, (transfer) => {
      _.forEach(transfer?.base_prods, (o) => {
        o.trsf_bs_cmpt_no = transfer?.trsf_cmpt_no;
        repostBases.push(o);
      });
    });

    _.forEach(arms, (arm) => {
      // get the matched base product from repost bases
      const repostBase = _.find(
        repostBases,
        (o) =>
          o.trsb_tk_tankcode === arm?.stream_tankcode &&
          o.base_cat === arm?.stream_bclass_code &&
          o.base_code === arm?.stream_basecode
      );

      if (repostBase !== undefined) {
        arm.stream_tankden = repostBase?.trsb_dns;
      }
      // console.log('---------- updateBaseProductTransfers', arm, repostBase);
    });

    return arms;
  };

  const updateBaseProductTransfers = (bases, transaction) => {
    // get all bases from transaction
    const repostBases = [];
    _.forEach(transaction?.transfers, (transfer) => {
      _.forEach(transfer?.base_prods, (o) => {
        o.trsf_bs_cmpt_no = transfer?.trsf_cmpt_no;
        repostBases.push(o);
      });
    });

    _.forEach(bases, (base) => {
      // get the matched base product from repost bases
      const repostBase = _.find(
        repostBases,
        (o) => o.trsf_bs_cmpt_no === base?.trsf_bs_cmpt_no && o.base_code === base?.trsf_bs_prodcd
      );
      if (repostBase !== undefined) {
        // base.trsf_bs_cmpt_no = repostBase.trsf_bs_cmpt_no;
        // base.trsf_bs_prodcd = repostBase.base_code;
        // base.trsf_bs_prodname = repostBase.base_code + ' - ' + repostBase.base_name;
        base.trsf_bs_tk_cd = repostBase.trsb_tk_tankcode;
        // base.trsf_bs_prodcls = repostBase.;
        base.trsf_bs_prodcls_code = repostBase.base_cat;
        base.trsf_bs_den = repostBase.trsb_dns;
        base.trsf_bs_temp = repostBase.trsb_tmp;
        base.trsf_bs_qty_amb = repostBase.trsb_avl;
        base.trsf_bs_qty_cor = repostBase.trsb_cvl;
        base.trsf_bs_load_kg = repostBase.trsb_kg;
        base.trsf_bs_adtv_flag = repostBase.base_cat === '6' ? true : false;
        // base.trsf_bs_ratio_value = repostBase.;
        // base.trsf_bs_ratio_total = repostBase.;
        // base.trsf_bs_ratio_total2 = repostBase.;
      }
      // console.log('---------- updateBaseProductTransfers', base, repostBase);
    });

    return bases;
  };

  const updateMeterTransfers = (meters, transaction) => {
    // get all meters from transaction
    const repostMeters = [];
    _.forEach(transaction?.transfers, (transfer) => {
      _.forEach(transfer?.meters, (o) => {
        o.trsf_cmpt_no = transfer?.trsf_cmpt_no;
        repostMeters.push(o);
      });
    });

    // TODO

    return meters;
  };

  const onDelete = () => {
    const filtered = _.reject(payload, ['trsf_cmpt_no', clicked?.trsf_cmpt_no]);

    setClicked(null);

    /* form.setFieldsValue({
      transfers: filtered,
    }); */

    setPayload(filtered);
  };

  const calcCompartmentQuantity = async (transfer, arms) => {
    // get arms for a particular product
    const prodArms = adjustProductArms(arms, transfer?.trsf_prod_cmpy, transfer?.trsf_prod_code);
    // get source of quantity
    let type = 'LT';
    let amount = 0;
    if (transfer?.trsf_qty_amb) {
      type = 'LT';
      amount = transfer?.trsf_qty_amb;
    } else if (transfer?.trsf_qty_cor) {
      type = 'L15';
      amount = transfer?.trsf_qty_cor;
    } else if (transfer?.trsf_load_kg) {
      type = 'KG';
      amount = transfer?.trsf_load_kg;
    } else {
      type = 'LT';
      amount = transfer?.trsf_qty_amb;
    }

    const response = await calcArmQuantity(
      transfer?.trsf_arm_cd,
      prodArms,
      amount,
      type,
      transfer?.trsf_temp
    );
    if (response?.result === false) {
      let errmsg = response?.message;
      if (!errmsg) {
        errmsg = t('descriptions.possibleReasonsToFailVCF');
      }
      if (errmsg?.indexOf('undefined') >= 0) {
        errmsg = errmsg.replace('undefined: undefined', t('descriptions.possibleReasonsToFailVCF'));
      }
      notification.error({
        message: t('descriptions.calculateFailed'),
        description: errmsg,
      });
      transfer.trsf_vcf = '';
    } else {
      transfer.trsf_qty_amb = response?.qty_amb;
      transfer.trsf_qty_cor = response?.qty_cor;
      transfer.trsf_load_kg = response?.load_kg;
      transfer.trsf_air_kg = response?.load_kg - response?.qty_cor * config?.airBuoyancyFactor;
      transfer.trsf_bases = response?.bases;
      transfer.trsf_vcf = response?.prod_vcf;
    }
    return transfer;
  };

  const calcTankerQuantity = async () => {
    let tidx = 0;
    let bidx = 0;

    // const draws = form.getFieldValue('transfers');
    const draws = _.clone(payload);

    for (tidx = 0; tidx < draws.length; tidx++) {
      const transfer = draws[tidx];

      if (
        transfer.trsf_arm_cd === t('placeholder.selectArmCode') ||
        transfer.trsf_arm_cd === t('placeholder.noArmAvailable') ||
        transfer.trsf_prod_name === t('placeholder.selectDrawerProduct')
      ) {
        continue;
      }
      if (!transfer.trsf_density || String(transfer.trsf_density).trim() === '') {
        continue;
      }
      if ((transfer.trsf_temp !== 0 && !transfer.trsf_temp) || String(transfer.trsf_temp).trim() === '') {
        continue;
      }
      if (
        (!transfer.trsf_qty_amb || String(transfer.trsf_qty_amb).trim() === '') &&
        (!transfer.trsf_qty_cor || String(transfer.trsf_qty_cor).trim() === '') &&
        (!transfer.trsf_load_kg || String(transfer.trsf_load_kg).trim() === '')
      ) {
        continue;
      }

      await calcCompartmentQuantity(transfer, productArms);
      draws[tidx] = transfer;
      // tableAPI.updateRowData({ update: [transfer] });
      updateTransferRow(transfer);
    }

    setPayload(draws);
  };

  const onCalculate = async () => {
    // check to see if at least one compartment has temperature and one of three quantities
    const payload = form.getFieldValue('transfers');
    // console.log('????????????????', form, payload);
    // const payload = retrieveTransfers();
    let found = false;
    for (let tidx = 0; tidx < payload.length; tidx++) {
      const titem = payload?.[tidx];
      if (
        titem.trsf_arm_cd !== t('placeholder.selectArmCode') &&
        titem.trsf_arm_cd !== t('placeholder.noArmAvailable') &&
        titem.trsf_prod_name !== t('placeholder.selectDrawerProduct') &&
        titem.trsf_density &&
        String(titem.trsf_density).trim() !== '' &&
        (titem.trsf_temp === 0 || titem.trsf_temp) &&
        String(titem.trsf_temp).trim() !== '' &&
        ((titem.trsf_qty_amb && String(titem.trsf_qty_amb).trim() !== '') ||
          (titem.trsf_qty_cor && String(titem.trsf_qty_cor).trim() !== '') ||
          (titem.trsf_load_kg && String(titem.trsf_load_kg).trim() !== ''))
      ) {
        found = true;
        break;
      }
    }
    if (found === false) {
      notification.warning({
        message: '',
        description: t('descriptions.cannotCalcQuantity'),
      });
      return;
    }

    setUpdating(true);
    //const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals'])
    //console.log('DrawerProductTransfers: onCalculate', items);

    await calcTankerQuantity();

    // trigger the changes in child components caused by clicked
    const option = clicked;
    setClicked(null);
    setClicked(option);
    //setUpdating(false);

    // check VCFs
    const payload2 = form.getFieldValue('transfers');
    console.log('...................vcf checks', payload2);
    let foundVCF = true;
    for (let tidx = 0; tidx < payload2.length; tidx++) {
      const titem = payload2?.[tidx];
      if (!titem.trsf_vcf || String(titem.trsf_vcf).trim() === '') {
        foundVCF = false;
        break;
      }
    }
    if (foundVCF === true) {
      notification.success({
        message: t('messages.calculateSuccess'),
        description: t('descriptions.calculateSuccess'),
      });
    }

    setDrawerChanges([]);
  };

  const onRestore = async () => {
    // console.log('DrawerProductTransfers: onRestore');
    const arms = await refreshProductArms(supplier, products?.records);

    _.forEach(productArms, (o) => {
      const item = _.find(
        arms,
        (arm) =>
          arm.rat_prod_prodcmpy === o.rat_prod_prodcmpy &&
          arm.rat_prod_prodcode === o.rat_prod_prodcode &&
          arm.stream_baycode === o.stream_baycode &&
          arm.stream_armcode === o.stream_armcode &&
          arm.stream_tankcode === o.stream_tankcode &&
          arm.stream_basecode === o.stream_basecode
      );
      o.stream_tankden = item?.stream_tankden;
    });

    const transfers = form.getFieldValue('transfers');
    _.forEach(transfers, (item) => {
      const prodArms = adjustProductArms(productArms, item?.trsf_prod_cmpy, item?.trsf_prod_code);
      item.trsf_density = calcArmDensity(item?.trsf_arm_cd, prodArms);
      // tableAPI.updateRowData({ update: [item] });
      updateTransferRow(item);
    });

    setPayload(transfers);

    const tanks = _.uniq(
      _.map(productArms, (item) => {
        return {
          tank_code: item.stream_tankcode,
          base_code: item.stream_basecode,
          tank_density: item.stream_tankden,
        };
      })
    );

    const bases = form.getFieldValue('base_transfers');
    const totals = form.getFieldValue('base_totals');
    // console.log('onRestore tanks', tanks);
    // setDataBaseTransfers([]);
    // setDataBaseTotals([]);

    _.forEach(bases, (item) => {
      const arm = _.find(
        tanks,
        (o) => o.base_code === item.trsf_bs_prodcd && o.tank_code === item.trsf_bs_tk_cd
      );
      item.trsf_bs_den = arm?.tank_density;
      // tableBaseTransfersAPI.updateRowData({ update: [item] });
      updateBaseTransferRow(item);
    });

    _.forEach(totals, (item) => {
      const arm = _.find(
        tanks,
        (o) => o.base_code === item.trsf_bs_prodcd_tot && o.tank_code === item.trsf_bs_tk_cd_tot
      );
      item.trsf_bs_den_tot = arm?.tank_density;
      // tableBaseTotalsAPI.updateRowData({ update: [item] });
      updateBaseTotalRow(item);
    });

    setDataBaseTransfers(bases);
    setDataBaseTotals(totals);

    // const option = clicked;
    // await setClicked(null);
    // await setClicked(option);

    notification.success({
      message: t('messages.restoreSuccess'),
      description: t('descriptions.tankDensityRestoreSuccess'),
    });
  };

  const onClear = async () => {
    // check to see if at least one compartment has temperature or three quantities
    const payload = form.getFieldValue('transfers');
    let found = false;
    if (clicked) {
      if (
        clicked.trsf_temp === 0 ||
        clicked.trsf_temp ||
        clicked.trsf_qty_amb ||
        clicked.trsf_qty_cor ||
        clicked.trsf_load_kg
      ) {
        found = true;
      }
    } else {
      for (let tidx = 0; tidx < payload.length; tidx++) {
        const titem = payload?.[tidx];
        if (
          titem.trsf_temp === 0 ||
          titem.trsf_temp ||
          titem.trsf_qty_amb ||
          titem.trsf_qty_cor ||
          titem.trsf_load_kg
        ) {
          found = true;
          break;
        }
      }
    }
    if (found === false) {
      notification.warning({
        message: '',
        description: !clicked
          ? t('descriptions.cannotClearTransfer')
          : t('descriptions.cannotClearOneTransfer'),
      });
      return;
    }

    /* notification.warning({
      message: '',
      description: !clicked ? t('descriptions.clearAllTransfer') : t('descriptions.clearLineTransfer'),
    }); */

    // console.log('DrawerProductTransfers: onClear');
    // const payload = form.getFieldValue('transfers');
    _.forEach(payload, (item) => {
      if (!clicked) {
        item.trsf_qty_amb = null;
        item.trsf_qty_cor = null;
        item.trsf_load_kg = null;
        item.trsf_air_kg = null;
        item.trsf_temp = null;
        item.trsf_vcf = null;
        // tableAPI.updateRowData({ update: [item] });
        updateTransferRow(item);
      } else {
        if (clicked?.trsf_cmpt_no === item.trsf_cmpt_no) {
          item.trsf_qty_amb = null;
          item.trsf_qty_cor = null;
          item.trsf_load_kg = null;
          item.trsf_air_kg = null;
          item.trsf_temp = null;
          item.trsf.vcf = null;
          // tableAPI.updateRowData({ update: [item] });
          updateTransferRow(item);
        }
      }
    });
    setPayload(payload);
    // console.log('DrawerProductTransfers: onClear', payload);

    notification.success({
      message: t('messages.clearTransferSuccess'),
      description: t('descriptions.clearTransferSuccess'),
    });

    toggleCalcButton();
    // toggleRestoreButton();
    toggleCopyButton();
  };

  const onCopy = async () => {
    // check to see if at least compartment has temperature or three quantities
    const payload = form.getFieldValue('transfers');
    let found = false;
    for (let tidx = 0; tidx < payload.length; tidx++) {
      const item = payload?.[tidx];
      if (
        !(
          item.trsf_arm_cd === t('placeholder.selectArmCode') ||
          item.trsf_arm_cd === t('placeholder.noArmAvailable') ||
          item.trsf_prod_name === t('placeholder.selectDrawerProduct')
        ) &&
        !(!item.trsf_density || String(item.trsf_density).trim() === '')
      ) {
        found = true;
        break;
      }
    }
    if (found === false) {
      notification.warning({
        message: '',
        description: t('descriptions.cannotCopyQuantity'),
      });
      return;
    }

    /* notification.warning({
      message: '',
      description: (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') 
        ? t('descriptions.copyScheduledQuantity') : t('descriptions.copyCompartmentCapacity'),
    }); */

    // console.log('DrawerProductTransfers: onCopy');

    // const payload = form.getFieldValue('transfers');
    _.forEach(payload, (item) => {
      // console.log('DrawerProductTransfers: onCopy in loop before', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
      if (
        !(
          item.trsf_arm_cd === t('placeholder.selectArmCode') ||
          item.trsf_arm_cd === t('placeholder.noArmAvailable') ||
          item.trsf_prod_name === t('placeholder.selectDrawerProduct')
        ) &&
        !(!item.trsf_density || String(item.trsf_density).trim() === '')
      ) {
        if (sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT') {
          // check the schedule unit and assign the available qty to proper field !!!!
          // item.trsf_qty_amb = item.trsf_qty_plan;
          // Note: allowed_qty (qty scheduled) and qtyOnBoard (qty loaded) are already considered product unit
          //          trsf_qty_plan: record?.allowed_qty === '' ? null : record?.allowed_qty,
          //          trsf_qty_left: qtyOnboard,
          const availQty = String(_.toNumber(item.trsf_qty_plan) - _.toNumber(item.trsf_qty_left));
          if (item.trsf_cmpt_unit === '5') {
            item.trsf_qty_amb = availQty;
          } else if (item.trsf_cmpt_unit === '11') {
            item.trsf_qty_cor = availQty;
          } else if (item.trsf_cmpt_unit === '17') {
            item.trsf_load_kg = availQty;
          } else {
            item.trsf_qty_amb = availQty;
          }
          // console.log('DrawerProductTransfers: onCopy in loop after1', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
          // tableAPI.updateRowData({ update: [item] });
          updateTransferRow(item);
        } else {
          if (item.trsf_cmpt_capacit) {
            // check the compartment unit and assign the safefill as available qty to proper field !!!!
            const availQty = item.trsf_cmpt_capacit;
            if (item.trsf_tc_unit === '5') {
              item.trsf_qty_amb = availQty;
            } else if (item.trsf_tc_unit === '11') {
              item.trsf_qty_cor = availQty;
            } else if (item.trsf_tc_unit === '17') {
              item.trsf_load_kg = availQty;
            } else {
              item.trsf_qty_amb = availQty;
            }
            // item.trsf_qty_amb = String(_.toNumber(item.trsf_cmpt_capacit) - _.toNumber(item.trsf_qty_left));
            // console.log('DrawerProductTransfers: onCopy in loop after2', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
            // tableAPI.updateRowData({ update: [item] });
            updateTransferRow(item);
          }
        }
      }
    });
    setPayload(payload);
    // console.log('DrawerProductTransfers: onCopy', payload);

    notification.success({
      message: t('messages.copyQuantitySuccess'),
      description:
        sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT'
          ? t('descriptions.copyScheduledQuantitySuccess')
          : t('descriptions.copyCompartmentCapacitySuccess'),
    });

    toggleCalcButton();
    // toggleRestoreButton();
    // toggleCopyButton();
  };

  const toggleCalcButton = () => {
    // console.log('DrawerProductTransfers: toggle button Calculate Drawer ', canCalc);
    const payload = form.getFieldValue('transfers');

    if (payload) {
      const item = _.find(
        payload,
        (o) =>
          (o?.trsf_temp === 0 || o?.trsf_temp) &&
          o?.trsf_density &&
          (o?.trsf_qty_amb || o?.trsf_qty_cor || o?.trsf_load_kg)
      );
      if (item) {
        setCanCalc(true);
      } else {
        setCanCalc(false);
      }
    } else {
      setCanCalc(false);
    }
  };

  const toggleRestoreButton = () => {
    // console.log('DrawerProductTransfers: toggle button Get Tank Densities ', canRestore);
    const payload = form.getFieldValue('transfers');
    // console.log('DrawerProductTransfers: toggle button Get Tank Densities ', payload);

    if (payload) {
      const item = _.find(payload, (o) => o?.trsf_density);
      if (item) {
        setCanRestore(true);
      } else {
        setCanRestore(false);
      }
    } else {
      setCanRestore(false);
    }
  };

  const toggleCopyButton = () => {
    // console.log('DrawerProductTransfers: toggle button Copy ', canCopy);
    const payload = form.getFieldValue('transfers');
    // console.log('DrawerProductTransfers: toggle button Copy ', payload);

    if (payload) {
      const item = _.find(
        payload,
        (o) =>
          !(
            o.trsf_arm_cd === t('placeholder.selectArmCode') ||
            o.trsf_arm_cd === t('placeholder.noArmAvailable') ||
            o.trsf_prod_name === t('placeholder.selectDrawerProduct')
          ) && !(!o.trsf_density || String(o.trsf_density).trim() === '')
      );
      // console.log('DrawerProductTransfers: toggle button Copy item', item);
      if (item) {
        setCanCopy(true);
      } else {
        setCanCopy(false);
      }
    } else {
      setCanCopy(false);
    }
  };

  const onCellUpdate = (value) => {
    // console.log('DrawerProductTransfers: onCellUpdate', value);
    // console.log('DrawerProductTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);
    if (
      value?.colDef?.field === 'trsf_arm_cd' ||
      value?.colDef?.field === 'trsf_temp' ||
      value?.colDef?.field === 'trsf_qty_amb' ||
      value?.colDef?.field === 'trsf_qty_cor' ||
      value?.colDef?.field === 'trsf_load_kg'
    ) {
      // user has changed something, remind that re-calc may be required
      // if (value?.newValue !== value?.oldValue)
      const changes = drawerChanges;
      const id = `${value?.colDef?.field}${value?.data.trsf_cmpt_no}`;
      _.remove(changes, (o) => o.key === id);
      changes.push({
        field:
          value?.colDef?.headerName +
          ' [' +
          t('fields.compartment') +
          ' ' +
          value?.data.trsf_cmpt_no +
          ': ' +
          value?.newValue +
          ']',
        message: t('prompts.valueChangeNeedRecalc'),
        key: id,
      });
      setDrawerChanges(changes);
      // remove base array so the changes in trnasfers can trigger the changes in base transfers
      value.data.trsf_bases = [];
    }
    setSelected({
      ...value?.data,
    });

    // It is necessary to clean the dataLoaded so that manual changes can take effect after data is loaded/
    if (dataLoaded) {
      if (dataLoaded.transfers && dataLoaded?.transfers?.length > 0) {
        dataLoaded.transfers = [];
      }
      if (dataLoaded.base_transfers && dataLoaded?.base_transfers?.length > 0) {
        dataLoaded.base_transfers = [];
      }
      if (dataLoaded.base_totals && dataLoaded?.base_totals?.length > 0) {
        dataLoaded.base_totals = [];
      }
      if (dataLoaded.meter_transfers && dataLoaded?.meter_transfers?.length > 0) {
        dataLoaded.meter_transfers = [];
      }
      if (dataLoaded.meter_totals && dataLoaded?.meter_totals?.length > 0) {
        dataLoaded.meter_totals = [];
      }
    }

    toggleCalcButton();
    toggleRestoreButton();
    toggleCopyButton();
  };

  useEffect(() => {
    if (selected) {
      // console.log("DrawerProductTransfers: line selected", selected);
      //adjustProduct(selected.trsf_cmpt_no, form.getFieldValue('base_transfers'));
    }
  }, [selected]);

  useEffect(() => {
    if (clicked) {
      // console.log("DrawerProductTransfers: line clicked", clicked);
    }
  }, [clicked]);

  useEffect(() => {
    if (data) {
      // console.log("DrawerProductTransfers: data changed", data?.records);
    }
  }, [data]);

  useEffect(() => {
    if (payload?.length > 0) {
      // console.log("DrawerProductTransfers: sourceType changed", sourceType);
      setPayload([]);
    }
  }, [sourceType]);

  useEffect(() => {
    if (supplier && products && !productArms && !loadingArms) {
      // console.log('.....................get product arms......', supplier, products, productArms, loadingArms);
      getProductArms(supplier, products?.records);
    }
  }, [supplier, products, productArms, loadingArms, getProductArms]);

  /* useEffect(() => {
    if (supplier && trip && repost && transactions && composition) {
      const transaction = getPrevTransaction(transactions, composition);
    }
  }, [supplier, trip, repost, transactions, composition]); */

  useEffect(() => {
    const values = columns(
      t,
      form,
      sourceType,
      loadType,
      loadNumber,
      setPayload,
      payload,
      units,
      products,
      composition,
      productArms,
      config
    );
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!I am here !!!!!', sourceType, loadType, loadNumber, setPayload, payload, products, composition, productArms);
    setFields(values);
  }, [
    t,
    form,
    sourceType,
    loadType,
    loadNumber,
    setPayload,
    payload,
    units,
    products,
    composition,
    productArms,
    config,
  ]);

  useEffect(() => {
    setLoading(true);
    setPayload([]);

    // console.log('DrawerProductTransfers: Watch - data, supplier, trip, order, tanker!', data, supplier, trip, order, tanker);

    // NOTE: this data is form get_order_details or get_sched_details, not the products
    if (data && productArms && composition && (!repost || (repost && transactions))) {
      // console.log('DrawerProductTransfers: Watch data, supplier, trip, order, tanker! Data not null', data);
      // adjust productArms if it is a repost transaction
      let transaction = {};
      if (repost) {
        transaction = getPrevTransaction(transactions, composition);
      }
      if (repost) {
        updateProductArms(productArms, transaction);
      }
      let transformed = buildDrawTransfers(data?.records, productArms, t, sourceType, loadType, repost);
      // console.log('DrawerProductTransfers: Watch data, supplier, trip, order, tanker - transformed', transformed);

      // adjust transfers if it is a repost transaction
      if (repost) {
        transformed = updateDrawerProductTransfers(transformed, transaction);
      }

      if (!dataLoaded || !dataLoaded?.transfers || dataLoaded?.transfers?.length === 0) {
        // console.log('*********************MT 1 - DrawProductTransfers: new data are loaded!');
        setPayload(transformed);
      } else {
        setPayload(dataLoaded?.transfers);
        // console.log('*********************MT 2 - DrawProductTransfers: existing data are loaded!');
        setSelected(dataLoaded?.transfers?.[0]);
        // const loaded = _.clone(dataLoaded);
        // loaded.transfers = [];
        // setDataLoaded(loaded);
        // // dataLoaded.transfers=[];
      }
      setLoading(false);
    }
  }, [data, productArms, supplier, trip, order, tanker, dataLoaded, repost, transactions, composition]);

  useEffect(() => {
    if (payload) {
      // console.log('DrawerProductTransfers: Payload changed and do setFieldsValue. payload:', payload);
      setFieldsValue({
        transfers: payload,
      });
      setDataRendered(true);

      toggleCalcButton();
      toggleRestoreButton();
      toggleCopyButton();
    }
  }, [payload, setFieldsValue]);

  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.transfers = payload;
    setDataBoard(board);
  }, [payload]);

  return (
    <>
      <Card size="small" title={t('divider.drawerProductTransfer')}>
        <Row gutter={[1, 8]}>
          <Col span={24}>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ marginRight: 5 }}
              onClick={onDelete}
              disabled={!clicked || updating}
            >
              {t('operations.deleteTransfer')}
            </Button>

            <Tooltip
              placement="topLeft"
              title={!clicked ? t('descriptions.clearAllTransfer') : t('descriptions.clearLineTransfer')}
            >
              <Button
                type="danger"
                icon={<ClearOutlined />}
                style={{ marginRight: 5 }}
                onClick={onClear}
                disabled={updating || !payload || payload?.length === 0}
              >
                {t('operations.clearTransfer')}
              </Button>
            </Tooltip>

            <Button
              type="primary"
              icon={<UndoOutlined />}
              onClick={onRestore}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!canRestore || updating}
            >
              {t('operations.getTankDensities')}
            </Button>

            <Button
              type="primary"
              icon={<CalculatorOutlined />}
              onClick={onCalculate}
              style={{ float: 'right', marginRight: 5 }}
              disabled={false} // !canCalc || updating}
              /* disabled={
                !clicked || 
                !clicked?.trsf_temp || 
                !clicked?.trsf_density || 
                (!clicked?.trsf_qty_amb && !clicked?.trsf_qty_cor && !clicked?.trsf_load_kg)
              } */
            >
              {t('operations.calculateDrawer')}
            </Button>

            {true && (
              <Tooltip
                placement="topLeft"
                title={
                  sourceType === 'SCHEDULE' && loadType === 'BY_COMPARTMENT'
                    ? t('descriptions.copyScheduledQuantity')
                    : t('descriptions.copyCompartmentCapacity')
                }
              >
                <Button
                  type="normal"
                  icon={<CopyOutlined />}
                  style={{ float: 'right', marginRight: 5 }}
                  onClick={onCopy}
                  disabled={!canCopy || updating}
                >
                  {t('operations.copyQuantity')}
                </Button>
              </Tooltip>
            )}
          </Col>
        </Row>

        <Form.Item name="transfers" noStyle>
          <DataTable
            // isLoading={updating}
            isLoading={updating}
            minimal={true}
            // parentHeight="200px"
            parentHeight={!!payload ? `${payload.length * 25 + 90}px` : '200px'}
            data={payload}
            // extra={modifiers}
            columns={fields}
            components={components}
            apiContext={setTableAPI}
            onCellUpdate={(value) => onCellUpdate(value)}
            handleSelect={(value) => setClicked(value[0])}
            editType={false}
          />
        </Form.Item>
      </Card>

      <Row gutter={[1, 8]}>
        <Col span={24}></Col>
      </Row>
      <Card size="small" title={t('divider.baseProducts')}>
        <Tabs defaultActiveKey="1" animated={false} type="card">
          <TabPane tab={t('tabColumns.baseProductDetails')} key="1" forceRender={true}>
            <BaseProductTransfers
              form={form}
              sourceType={sourceType}
              selected={selected}
              transfers={payload}
              productArms={productArms}
              clicked={clicked}
              updating={updating}
              setUpdating={setUpdating}
              setChildTableAPI={setTableBaseTransfersAPI}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataBaseTransfers}
              setData={setDataBaseTransfers}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
              config={config}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.cumulativeBaseProduct')} key="2" forceRender={true}>
            <BaseProductTotals
              form={form}
              sourceType={sourceType}
              selected={selected}
              transfers={payload}
              productArms={productArms}
              clicked={clicked}
              updating={updating}
              setUpdating={setUpdating}
              setChildTableAPI={setTableBaseTotalsAPI}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataBaseTotals}
              setData={setDataBaseTotals}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
              config={config}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Row gutter={[1, 8]}>
        <Col span={24}></Col>
      </Row>
      <Card size="small" title={t('divider.meters')}>
        <Tabs defaultActiveKey="1" animated={false} type="card">
          <TabPane tab={t('tabColumns.meterDetail')} key="1" forceRender={true}>
            <MeterTransfers
              form={form}
              sourceType={sourceType}
              selected={selected}
              transfers={payload}
              productArms={productArms}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataMeterTransfers}
              setData={setDataMeterTransfers}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.cumulativeMeterTotals')} key="2" forceRender={true}>
            <MeterTotals
              form={form}
              sourceType={sourceType}
              selected={selected}
              transfers={payload}
              productArms={productArms}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataMeterTotals}
              setData={setDataMeterTotals}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default DrawerProductTransfers;
