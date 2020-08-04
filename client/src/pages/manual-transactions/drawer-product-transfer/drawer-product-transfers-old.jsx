import React, { useState, useEffect } from 'react';
import { UndoOutlined, DeleteOutlined, CopyOutlined, ClearOutlined, CalculatorOutlined } from '@ant-design/icons';
import { Button, Form, Tabs, Divider, Card, Row, Col, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';

import api, { MANUAL_TRANSACTIONS } from '../../../api';
import {calcBaseRatios, calcArmDensity, getAvailableArms, adjustProductArms} from '../../../utils'

import BaseProductTransfers from './base-product-transfers';
import BaseProductTotals from './base-product-totals';
import MeterTransfers from './meter-transfers';
import MeterTotals from './meter-totals';

// import {buildMeterTransfers, buildMeterTotals} from '../data-builder';

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
  dataLoadFlagDrawTransfers,
  setDataLoadFlagDrawTransfers,
  dataLoadFlagBaseTransfers,
  setDataLoadFlagBaseTransfers,
  dataLoadFlagBaseTotals,
  setDataLoadFlagBaseTotals,
  dataLoadFlagMeterTransfers,
  setDataLoadFlagMeterTransfers,
  dataLoadFlagMeterTotals,
  setDataLoadFlagMeterTotals,
  dataLoaded,
  setDataLoaded,
  productArms,
  setProductArms,
}) => {
  const { data } = useSWR((
      sourceType === 'SCHEDULE' && supplier && trip && 
      `${MANUAL_TRANSACTIONS.TRIP_DETAILS}?supplier=${supplier}&trip_no=${trip}`
    ) || (
      sourceType === 'OPENORDER' && supplier && order && tanker && 
      `${MANUAL_TRANSACTIONS.ORDER_DETAILS}?supplier=${supplier}&order_cust_no=${order}&tanker=${tanker}`
    )
  );

  const { data: products } = useSWR((
      sourceType === 'SCHEDULE' && supplier && trip && 
      `${MANUAL_TRANSACTIONS.TRIP_PRODUCTS}?supplier_code=${supplier}&shls_trip_no=${trip}`
    ) || (
      sourceType === 'OPENORDER' && supplier && order && 
      `${MANUAL_TRANSACTIONS.ORDER_PRODUCTS}?supplier=${supplier}&order_cust_no=${order}`
    )
  );

  const { data: composition } = useSWR(tanker && `${MANUAL_TRANSACTIONS.COMPOSITION}?tnkr_code=${tanker}`);

  const { t } = useTranslation();
  //const { setFieldsValue } = form;

  const [isLoading, setLoading] = useState(true);
  const [dataRendered, setDataRendered] = useState(false);
  //const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [tableBaseTransfersAPI, setTableBaseTransfersAPI] = useState(null);
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

  const onDelete = () => {
    const filtered = _.reject(payload, ['trsf_cmpt_no', clicked?.trsf_cmpt_no]);

    setClicked(null);

    /* form.setFieldsValue({
      transfers: filtered,
    }); */

    setPayload(filtered);
  };

  const calcBaseQuantity = async (base) => {
    // decide the calc type: LT, L15, KG
    let type = 'LT';
    let amount = 0;
    if (base?.trsf_bs_qty_amb) {
      type = 'LT';
      amount = base?.trsf_bs_qty_amb;
    }
    else if (base?.trsf_bs_qty_cor) {
      type = 'L15';
      amount = base?.trsf_bs_qty_cor;
    }
    else if (base?.trsf_bs_load_kg) {
      type = 'KG';
      amount = base?.trsf_bs_load_kg;
    }
    else {
      type = 'LT';
      amount = base?.trsf_bs_qty_amb;
    }

    await api
    .post(MANUAL_TRANSACTIONS.CALCULATE, {
      frm_baseCd: base?.trsf_bs_prodcd,
      frm_which_type: type, //'LT',
      frm_real_amount: amount,
      frm_real_temp: base?.trsf_bs_temp,
      frm_real_dens: base?.trsf_bs_den,
    })
    .then((response) => {
      if (!response?.data?.real_litre) {
        notification.error({
          message: t('descriptions.calculateFailed') + ': ' + base?.trsf_bs_prodcd,
          description: response?.data?.msg_code + ': ' + response?.data?.msg_desc,
        });
      }
      else {
        if (type === 'LT') {
          base.trsf_bs_qty_cor = _.toNumber(response?.data?.real_litre15);
          base.trsf_bs_load_kg = _.toNumber(response?.data?.real_kg);
        }
        if (type === 'L15') {
          base.trsf_bs_qty_amb = _.toNumber(response?.data?.real_litre);
          base.trsf_bs_load_kg = _.toNumber(response?.data?.real_kg);
        }
        if (type === 'KG') {
          base.trsf_bs_qty_amb = _.toNumber(response?.data?.real_litre);
          base.trsf_bs_qty_cor = _.toNumber(response?.data?.real_litre15);
        }
      }
      console.log('DrawerProductTransfers: calcBaseQuantity', base);
    });

  }

  const CalcDrawQuantityByCompartment = async (cmpt) => {
    //const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals'])    
    //console.log('DrawerProductTransfers: onCalculate', items);

    const qtys = {amb: 0, cor: 0, kg: 0};
    // const bases = form.getFieldValue('base_transfers');
    const bases = _.clone(dataBaseTransfers);
    let index=0;
    for (index=0; index<bases.length; index++) {
      const base = bases[index];
      if (base.trsf_bs_cmpt_no === cmpt) {
        await calcBaseQuantity(base);
        bases[index] = base;
        qtys.amb += _.toNumber(base?.trsf_bs_qty_amb);
        qtys.cor += _.toNumber(base?.trsf_bs_qty_cor);
        qtys.kg += _.toNumber(base?.trsf_bs_load_kg);
        // tableBaseTransfersAPI.updateRowData({ update: [base] });
      }
    }
    setDataBaseTransfers(bases);

    const payload2 = _.clone(payload);
    for (index = 0; index < payload2.length; index++) {
      const transfer = payload2[index];
      if (transfer.trsf_cmpt_no === cmpt) {
        transfer.trsf_qty_amb = qtys.amb;
        transfer.trsf_qty_cor = qtys.cor;
        transfer.trsf_load_kg = qtys.kg;
        payload2[index] = transfer;
        tableAPI.updateRowData({ update: [transfer] });
        break;
      }
    }

    setPayload(payload2);
  };

  const checkQtySource = async (transfer) => {
    // decide the calc type: LT, L15, KG
    let type = 'LT';
    let amount = 0;
    if (transfer?.trsf_qty_amb) {
      type = 'LT';
      amount = transfer?.trsf_qty_amb;
    }
    else if (transfer?.trsf_qty_cor) {
      type = 'L15';
      amount = transfer?.trsf_qty_cor;
    }
    else if (transfer?.trsf_load_kg) {
      type = 'KG';
      amount = transfer?.trsf_load_kg;
    }
    else {
      type = 'LT';
      amount = transfer?.trsf_qty_amb;
    }

    return {type: type, amount: amount};
  }

  const verifySourceQuantity2 = (bases, draws) => {
    let tidx = 0;
    let bidx = 0;

    for (tidx = 0; tidx < draws.length; tidx++) {
      const transfer = draws[tidx];
      const cmpt = transfer.trsf_cmpt_no;
      const source = checkQtySource(transfer);
      for (bidx=0; bidx<bases.length; bidx++) {
        const base = bases[bidx];
        if (base.trsf_bs_cmpt_no === cmpt) {
          let changed = false;
          if (transfer?.trsf_qty_amb && _.toNumber(transfer?.trsf_qty_amb) > 0 && source?.type === 'LT') {
            // if (!base?.trsf_bs_qty_amb || (base?.trsf_bs_qty_amb && _.toNumber(base?.trsf_bs_qty_amb) === 0)) {
              base.trsf_bs_qty_amb = calcBaseRatios(transfer?.trsf_qty_amb, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            // }
          }
          if (transfer?.trsf_qty_cor && _.toNumber(transfer?.trsf_qty_cor) > 0 && source?.type === 'L15') {
            // if (!base?.trsf_bs_qty_cor || (base?.trsf_bs_qty_cor && _.toNumber(base?.trsf_bs_qty_cor) === 0)) {
              base.trsf_bs_qty_cor = calcBaseRatios(transfer?.trsf_qty_cor, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            // }
          }
          if (transfer?.trsf_load_kg && _.toNumber(transfer?.trsf_load_kg) > 0 && source?.type === 'KG') {
            // if (!base?.trsf_bs_load_kg || (base?.trsf_bs_load_kg && _.toNumber(base?.trsf_bs_load_kg) === 0)) {
              base.trsf_bs_load_kg = calcBaseRatios(transfer?.trsf_load_kg, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            // }
          }
          if (changed) {
            bases[bidx] = base;
          }
        }
      }
    }

    return bases;
  }

  const verifySourceQuantity = (bases, draws) => {
    let tidx = 0;
    let bidx = 0;

    for (tidx = 0; tidx < draws.length; tidx++) {
      const transfer = draws[tidx];
      const cmpt = transfer.trsf_cmpt_no;
      for (bidx=0; bidx<bases.length; bidx++) {
        const base = bases[bidx];
        if (base.trsf_bs_cmpt_no === cmpt) {
          let changed = false;
          if (transfer?.trsf_qty_amb && _.toNumber(transfer?.trsf_qty_amb) > 0) {
            if (!base?.trsf_bs_qty_amb || (base?.trsf_bs_qty_amb && _.toNumber(base?.trsf_bs_qty_amb) === 0)) {
              base.trsf_bs_qty_amb = calcBaseRatios(transfer?.trsf_qty_amb, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            }
          }
          if (transfer?.trsf_qty_cor && _.toNumber(transfer?.trsf_qty_cor) > 0) {
            if (!base?.trsf_bs_qty_cor || (base?.trsf_bs_qty_cor && _.toNumber(base?.trsf_bs_qty_cor) === 0)) {
              base.trsf_bs_qty_cor = calcBaseRatios(transfer?.trsf_qty_cor, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            }
          }
          if (transfer?.trsf_load_kg && _.toNumber(transfer?.trsf_load_kg) > 0) {
            if (!base?.trsf_bs_load_kg || (base?.trsf_bs_load_kg && _.toNumber(base?.trsf_bs_load_kg) === 0)) {
              base.trsf_bs_load_kg = calcBaseRatios(transfer?.trsf_load_kg, base?.trsf_bs_ratio_value, base?.trsf_bs_ratio_total);
              changed = true;
            }
          }
          if (changed) {
            bases[bidx] = base;
          }
        }
      }
    }

    return bases;
  }

  const initBaseTotals = (items) => {
    const totals = [];
    console.log('DrawerProductTransfers: initBaseTotals - start', items);

    _.forEach(items, (item) => {
      totals.push({
        trsf_bs_prodcd_tot: item.trsf_bs_prodcd,
        trsf_bs_prodname_tot: item.trsf_bs_prodname,
        trsf_bs_tk_cd_tot: item.trsf_bs_tk_cd,
        trsf_bs_prodcls_tot: item.trsf_bs_prodcls,
        trsf_bs_den_tot: item.trsf_bs_den,
        trsf_bs_temp_tot: item.trsf_bs_temp,
        trsf_bs_qty_amb_tot: item.trsf_bs_qty_amb,
        trsf_bs_qty_cor_tot: item.trsf_bs_qty_cor,
        trsf_bs_load_kg_tot: item.trsf_bs_load_kg,
        trsf_bs_adtv_flag_tot: item.trsf_bs_adtv_flag,
        trsf_bs_ratio_value_tot: item.trsf_bs_ratio_value,
        trsf_bs_ratio_total_tot: item.trsf_bs_ratio_total,
        trsf_bs_ratio_total2_tot: item.trsf_bs_ratio_total2,
        is_updated: item.is_updated,
      });
    });
    console.log('DrawerProductTransfers: initBaseTotals - end', totals);

    return totals;
  }

  const makeBaseTotals = (items) => {
    const totals = [];
    console.log('DrawerProductTransfers: makeBaseTotals - start', items);
    let itemExisted = false;

    _.forEach(items, (item) => {
      itemExisted = false;
      for (let index = 0; index < totals.length; index++) {
        const total = totals[index];
        if (total.trsf_bs_prodcd_tot === item.trsf_bs_prodcd_tot && total.trsf_bs_tk_cd_tot === item.trsf_bs_tk_cd_tot) {
          total.trsf_bs_qty_amb_tot = _.toNumber(total.trsf_bs_qty_amb_tot) + _.toNumber(item.trsf_bs_qty_amb_tot);
          total.trsf_bs_qty_cor_tot = _.toNumber(total.trsf_bs_qty_cor_tot) + _.toNumber(item.trsf_bs_qty_cor_tot);
          total.trsf_bs_load_kg_tot = _.toNumber(total.trsf_bs_load_kg_tot) + _.toNumber(item.trsf_bs_load_kg_tot);
          total.trsf_bs_temp_tot = null;
          totals[index] = total;
          itemExisted = true;
        }
      }
      if (!itemExisted) {
        totals.push(item);
      }
    });
    console.log('DrawerProductTransfers: makeBaseTotals - end', totals);

    return totals;
  }

  const CalcDrawQuantity = async () => {
    //const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals']);
    //console.log('DrawerProductTransfers: onCalculate', items);

    let tidx = 0;
    let bidx = 0;

    // const draws = form.getFieldValue('transfers');
    const draws = _.clone(payload);
    // let bases = form.getFieldValue('base_transfers');
    let bases = _.clone(dataBaseTransfers);
    // console.log('CalcDrawQuantity bases', bases);
    // console.log('CalcDrawQuantity dataBaseTransfers', dataBaseTransfers);
    // console.log('CalcDrawQuantity base_transfers', form.getFieldValue('base_transfers'));

    // make sure the base quantity is available for alculation, if not, populate it with the ratio of drawer product quantity
    bases = verifySourceQuantity(bases, draws);

    for (tidx = 0; tidx < draws.length; tidx++) {
      const transfer = draws[tidx];
      const cmpt = transfer.trsf_cmpt_no;
      const qtys = {amb: 0, cor: 0, kg: 0};
      let matched = false;
      for (bidx=0; bidx<bases.length; bidx++) {
        const base = bases[bidx];
        if (base.trsf_bs_cmpt_no === cmpt) {
          await calcBaseQuantity(base);
          bases[bidx] = base;
          qtys.amb += _.toNumber(base?.trsf_bs_qty_amb);
          qtys.cor += _.toNumber(base?.trsf_bs_qty_cor);
          qtys.kg += _.toNumber(base?.trsf_bs_load_kg);
          matched = true;
          tableBaseTransfersAPI.updateRowData({ update: [base] });
        }
      }
      if (matched === true) {
        transfer.trsf_qty_amb = qtys.amb;
        transfer.trsf_qty_cor = qtys.cor;
        transfer.trsf_load_kg = qtys.kg;
        draws[tidx] = transfer;
        tableAPI.updateRowData({ update: [transfer] });
      }
    }

    const baseTotals = makeBaseTotals(initBaseTotals(bases));

    setDataBaseTransfers(bases);
    setDataBaseTotals(baseTotals);
    setPayload(draws);
  };

  const onCalculate = async () => {
    setUpdating(true);
    //const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals'])    
    //console.log('DrawerProductTransfers: onCalculate', items);

    await CalcDrawQuantity();
    //CalcDrawQuantityByCompartment(clicked?.trsf_cmpt_no);

    // trigger the changes in child components caused by clicked
    const option = clicked;
    setClicked(null);
    setClicked(option);
    //setUpdating(false);

    notification.success({
      message: t('messages.calculateSuccess'),
      description: t('descriptions.calculateSuccess'),
    });
  };

  const onCalculateOld = async () => {
    //const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals'])    
    //console.log('DrawerProductTransfers: onCalculate', items);

    const qtys = {amb: 0, cor: 0, kg: 0};
    // const bases = form.getFieldValue('base_transfers');
    const bases = _.clone(dataBaseTransfers);
    let index=0;
    for (index=0; index<bases.length; index++) {
      const base = bases[index];
      if (base.trsf_bs_cmpt_no === clicked?.trsf_cmpt_no) {
        await calcBaseQuantity(base);
        bases[index] = base;
        qtys.amb += _.toNumber(base?.trsf_bs_qty_amb);
        qtys.cor += _.toNumber(base?.trsf_bs_qty_cor);
        qtys.kg += _.toNumber(base?.trsf_bs_load_kg);
        // tableBaseTransfersAPI.updateRowData({ update: [base] });
      }
    }
    setDataBaseTransfers(bases);

    const payload2 = _.clone(payload);
    for (index = 0; index < payload2.length; index++) {
      const transfer = payload2[index];
      if (transfer.trsf_cmpt_no === clicked?.trsf_cmpt_no) {
        transfer.trsf_qty_amb = qtys.amb;
        transfer.trsf_qty_cor = qtys.cor;
        transfer.trsf_load_kg = qtys.kg;
        payload2[index] = transfer;
        tableAPI.updateRowData({ update: [transfer] });
        break;
      }
    }

    setPayload(payload2);

    // trigger the changes in child components caused by clicked
    const option = clicked;
    setClicked(null);
    setClicked(option);
  };

  const onRestore = async () => {
    console.log('DrawerProductTransfers: onRestore');
    const option = selected;
    await setSelected(null);
    await setSelected(option);
    notification.success({
      message: t('messages.restoreSuccess'),
      description: t('descriptions.tankDensityRestoreSuccess'),
    });
  };

  const onClear = async () => {
    console.log('DrawerProductTransfers: onClear');
    
    const payload = form.getFieldValue('transfers');
    _.forEach(payload, (item) => {
      if (!clicked) {
        item.trsf_qty_amb = null;
        item.trsf_qty_cor = null;
        item.trsf_load_kg = null;
        item.trsf_temp = null;
        tableAPI.updateRowData({ update: [item] });
      } else {
        if (clicked?.trsf_cmpt_no === item.trsf_cmpt_no) {
          item.trsf_qty_amb = null;
          item.trsf_qty_cor = null;
          item.trsf_load_kg = null;
          item.trsf_temp = null;
          tableAPI.updateRowData({ update: [item] });
        }
      }
    });
    setPayload(payload);
    console.log('DrawerProductTransfers: onClear', payload);

    notification.success({
      message: t('messages.clearTransferSuccess'),
      description: t('descriptions.clearTransferSuccess'),
    });

    toggleCalcButton();
    // toggleRestoreButton();
    // toggleCopyButton();
  };

  const onCopy = async () => {
    console.log('DrawerProductTransfers: onCopy');
    
    const payload = form.getFieldValue('transfers');
    _.forEach(payload, (item) => {
      console.log('DrawerProductTransfers: onCopy in loop before', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
      if (item.trsf_qty_plan) {
        item.trsf_qty_amb = item.trsf_qty_plan;
        console.log('DrawerProductTransfers: onCopy in loop after1', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
        tableAPI.updateRowData({ update: [item] });
      } else {
        if (item.trsf_cmpt_capacit) {
          item.trsf_qty_amb = item.trsf_cmpt_capacit;
          console.log('DrawerProductTransfers: onCopy in loop after2', item.trsf_qty_plan, item.trsf_cmpt_capacit, item.trsf_qty_amb);
          tableAPI.updateRowData({ update: [item] });
        }
      }
    });
    setPayload(payload);
    console.log('DrawerProductTransfers: onCopy', payload);

    notification.success({
      message: t('messages.copyQuantitySuccess'),
      description: t('descriptions.copyQuantitySuccess'),
    });

    toggleCalcButton();
    // toggleRestoreButton();
    // toggleCopyButton();
  };

  const toggleCalcButton = () => {
    console.log('DrawerProductTransfers: toggle button Calculate Drawer ', canCalc);
    const payload = form.getFieldValue('transfers');

    if (payload) {
      const item = _.find(payload, (o) => (
        (o?.trsf_temp===0 || o?.trsf_temp) && o?.trsf_density && (o?.trsf_qty_amb || o?.trsf_qty_cor || o?.trsf_load_kg)
      ));
      if (item) {
        setCanCalc(true);
      } else {
        setCanCalc(false);
      }
    } else {
      setCanCalc(false);
    }
  }

  const toggleRestoreButton = () => {
    console.log('DrawerProductTransfers: toggle button Get Tank Densities ', canRestore);
    const payload = form.getFieldValue('transfers');
    console.log('DrawerProductTransfers: toggle button Get Tank Densities ', payload);

    if (payload) {
      const item = _.find(payload, (o) => (o?.trsf_density));
      if (item) {
        setCanRestore(true);
      } else {
        setCanRestore(false);
      }
    } else {
      setCanRestore(false);
    }
  }

  const toggleCopyButton = () => {
    console.log('DrawerProductTransfers: toggle button Copy ', canCopy);
    const payload = form.getFieldValue('transfers');
    console.log('DrawerProductTransfers: toggle button Copy ', payload);

    if (payload) {
      const item = _.find(payload, (o) => (o?.trsf_cmpt_capacit || o?.trsf_qty_plan));
      if (item) {
        setCanCopy(true);
      } else {
        setCanCopy(false);
      }
    } else {
      setCanCopy(false);
    }
  }

  const onCellUpdate = (value) => {
    console.log('DrawerProductTransfers: onCellUpdate', value);
    console.log('DrawerProductTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);
    /* if (
      value?.colDef?.field === 'trsf_qty_amb' || 
      value?.colDef?.field === 'trsf_qty_cor' ||
      value?.colDef?.field === 'trsf_load_kg' 
    ) {
      if (_.toNumber(value?.newValue) > _.toNumber(value?.data.trsf_cmpt_capacit)) {
        notification.error({
          message: t('validate.outOfRange'),
          description: value?.colDef?.headerName + ': ' + value?.newValue + ', ' + 
          t('fields.compartment') + ' ' + t('fields.capacity') + ': ' + value?.data.trsf_cmpt_capacit,
        });
      }
    } */
    if (value?.colDef?.field === 'trsf_arm_cd') {
      // console.log('buildMeterTransfers', buildMeterTransfers(productArms, payload));
      // console.log('buildMeterTotals', buildMeterTotals(productArms, payload));
    }
    setSelected({
      ...value?.data,
    });

    toggleCalcButton();
    toggleRestoreButton();
    toggleCopyButton();
  };

  const adjustProduct = (cmpt, bases) => {
    if (!bases || !cmpt) {
      return;
    }
    console.log('DrawerProductTransfers: adjustProdcut', cmpt, bases);

    let index = undefined;
    let prodDens = 0.0;

    // calculate drawer product density
    for (index = 0; index < bases.length; index++) {
      const item = bases[index];
      if (item.trsf_bs_cmpt_no === cmpt) {
        prodDens = prodDens + calcBaseRatios(item?.trsf_bs_den, item?.trsf_bs_ratio_value, item?.trsf_bs_ratio_total);
      }
    }
    console.log('DrawerProductTransfers: prod dens', prodDens);

    for (index = 0; index < payload.length; index++) {
      const transfer = payload[index];
      if (transfer.trsf_cmpt_no === cmpt && prodDens > 0) {
        transfer.trsf_density = prodDens;
        payload[index] = transfer;
        break;
      }
    }

    setPayload(payload);
    //tableAPI.updateRowData({ update: [payload[index]] });

  };

  useEffect(() => {
    if (selected) {
      console.log("DrawerProductTransfers: line selected", selected);
      //adjustProduct(selected.trsf_cmpt_no, form.getFieldValue('base_transfers'));
    }
  }, [selected]);

  useEffect(() => {
    if (clicked) {
      console.log("DrawerProductTransfers: line clicked", clicked);
    }
  }, [clicked]);

  useEffect(() => {
    if (data) {
      console.log("DrawerProductTransfers: data changed", data?.records);
    }
  }, [data]);

  useEffect(() => {
    if (payload?.length > 0) {
      console.log("DrawerProductTransfers: sourceType changed", sourceType);
      setPayload([]);
    }
  }, [sourceType]);

  useEffect(() => {
    if (supplier && products && !productArms && !loadingArms) {
      getProductArms(supplier, products?.records);
    }
  }, [supplier, products, productArms, loadingArms, getProductArms]);

  useEffect(() => {
    const values = columns(t, form, sourceType, loadType, loadNumber, setPayload, payload, products, composition, productArms);

    setFields(values);
  }, [t, form, sourceType, loadType, loadNumber, setPayload, payload, products, composition, productArms]);

  useEffect(() => {
    if (dataLoadFlagDrawTransfers !== 0) {
      console.log("DrawerProductTransfers: data loading from DB, don't need build the transfers from scratch.");
      //return;
    }

    setLoading(true);
    setPayload([]);

    // console.log('DrawerProductTransfers: Watch - data, supplier, trip, order, tanker!', data, supplier, trip, order, tanker);

    // NOTE: this data is form get_order_details or get_sched_details, not the products
    if (data && productArms) {
      const transformed = [];
      console.log('DrawerProductTransfers: Watch data, supplier, trip, order, tanker! Data not null', data);

      _.forEach(data?.records, (record) => {
        //console.log('watch data, supplier, trip, order, tanker in loop', record?.shls_supp);
        if (record.shls_supp !== '') {
          // console.log('watch data, supplier, trip, order, tanker in if supplier', record, record?.shls_supp, record?.prod_code);
          let armClnValue = t('placeholder.selectArmCode');
          let densClnValue = null;
          if (record?.prod_name !== '' && record?.prod_name !== undefined) {
            const items = getAvailableArms(productArms, record?.shls_supp, record?.prod_code);
            if (items?.length === 0) {
              armClnValue = t('placeholder.noArmAvailable');
            }
            if (items?.length > 0) {
              armClnValue = items?.[0]?.stream_armcode;
              const prodArms = adjustProductArms(productArms, record?.shls_supp, record?.prod_code);
              densClnValue = calcArmDensity(items?.[0]?.stream_index, prodArms);
            }
          }
          const object = {
            trsf_sold_to: record?.customer_code,
            trsf_delv_num: record?.delivery_number,
            trsf_delv_loc: record?.delivery_location,
            trsf_equip_id: record?.eqpt_code,
            trsf_cmpt_no: record?.tnkr_cmpt_no,
            trsf_cmpt_capacit: record?.cmpt_capacit,
            trsf_drwr_cd: record?.shls_supp,
            trsf_prod_code: record?.prod_code,
            trsf_prod_name: record?.prod_name === '' ? t('placeholder.selectDrawerProduct') : record?.prod_desc,
            trsf_prod_cmpy: record?.shls_supp,
            trsf_arm_cd: armClnValue,
            trsf_qty_plan: record?.allowed_qty==='' ? null : record?.allowed_qty,
            //trsf_qty_left: record?.allowed_qty==='' ? null : String(_.toNumber(record?.allowed_qty) - _.toNumber(record?.load_qty)),
            trsf_qty_left: record?.load_qty==='' ? null : record?.load_qty,
            trsf_density: densClnValue,
            trsf_temp: null,
            trsf_qty_amb: null,
            trsf_qty_cor: null,
            trsf_load_kg: null,
          };

          transformed.push(object);
        }
      });

      console.log('DrawerProductTransfers: Watch data, supplier, trip, order, tanker - transformed', transformed);

      if (dataLoadFlagDrawTransfers === 0) {
        setPayload(transformed);
      } else {
        if (dataLoadFlagDrawTransfers === 1) {
          setPayload(dataLoaded?.transfers);
          setDataLoadFlagDrawTransfers(2);
          console.log('MT 2 - DrawProductTransfers: data are loaded!', dataLoadFlagDrawTransfers);
          setSelected(dataLoaded?.transfers?.[0]);
        }
      }
      setLoading(false);
    }
  }, [data, productArms, supplier, trip, order, tanker]);

  useEffect(() => {
    if (payload) {
      console.log('DrawerProductTransfers: Payload changed and do setFieldsValue. payload:', payload);
      form.setFieldsValue({
        transfers: payload,
      });
      setDataRendered(true);

      toggleCalcButton();
      toggleRestoreButton();
      toggleCopyButton();
    }
  }, [payload]);

  /* useEffect(() => {
    if (dataLoadFlagDrawTransfers === 1 && dataLoaded && dataRendered===true) {
      console.log('DrawerProductTransfers: Load data by setPayload. dataLoadFlagDrawTransfers', dataLoadFlagDrawTransfers);
      // setPayload(dataLoaded?.transfers);
      form.setFieldsValue({
        transfers: dataLoaded?.transfers,
      });
      setDataLoadFlagDrawTransfers(2);
      setDataRendered(false);
      console.log('MT 2 - DrawerProductTransfers: data are loaded!', dataLoadFlagDrawTransfers);
    }
  }, [dataLoadFlagDrawTransfers, dataLoaded, dataRendered]);
 */
  useEffect(() => {
    let board = dataBoard;
    if (!board) {
      board = {};
    }
    board.transfers = payload;
    setDataBoard(board);
  }, [payload]);

  const modifiers = (
    <>
    </>
  );

  return (
    <>
      <Card size="small" title={t('divider.drawerProductTransfer')}>
        <Row gutter={[1,8]}>
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

            <Button
              type="danger"
              icon={<ClearOutlined />}
              style={{ marginRight: 5 }}
              onClick={onClear}
              disabled={updating}
            >
              {t('operations.clearTransfer')}
            </Button>

            <Button 
              type="primary" 
              icon={<UndoOutlined />} 
              onClick={onRestore}
              style={{ float: 'right', marginRight: 5 }} 
              disabled={!canRestore || updating}>
              {t('operations.getTankDensities')}
            </Button>

            <Button
              type="primary"
              icon={<CalculatorOutlined />}
              onClick={onCalculate}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!canCalc || updating}
              /* disabled={
                !clicked || 
                !clicked?.trsf_temp || 
                !clicked?.trsf_density || 
                (!clicked?.trsf_qty_amb && !clicked?.trsf_qty_cor && !clicked?.trsf_load_kg)
              } */
            >
              {t('operations.calculateDrawer')}
            </Button>

            <Button
              type="normal"
              icon={<CopyOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onCopy}
              disabled={!canCopy || updating}
            >
              {t('operations.copyQuantity')}
            </Button>
          </Col>
        </Row>

        <Form.Item name="transfers" noStyle>
          <DataTable
            // isLoading={updating || dataLoadFlagDrawTransfers!==0}
            isLoading={updating}
            minimal={true}
            // parentHeight="200px"
            parentHeight={!!payload ? `${payload.length*25+90}px`:"200px"}
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

      <Row gutter={[1,8]}>
        <Col span={24}>
        </Col>
      </Row>
      <Card size="small" title={t('divider.baseProducts')}>
        <Tabs defaultActiveKey="1" animated={false} type="card">
          <TabPane tab={t('tabColumns.transferDetails')} key="1" forceRender={true}>
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
              dataLoadFlag={dataLoadFlagBaseTransfers}
              setDataLoadFlag={setDataLoadFlagBaseTransfers}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
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
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataBaseTotals}
              setData={setDataBaseTotals}
              dataLoadFlag={dataLoadFlagBaseTotals}
              setDataLoadFlag={setDataLoadFlagBaseTotals}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Row gutter={[1,8]}>
        <Col span={24}>
        </Col>
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
              dataLoadFlag={dataLoadFlagMeterTransfers}
              setDataLoadFlag={setDataLoadFlagMeterTransfers}
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
              dataLoadFlag={dataLoadFlagMeterTotals}
              setDataLoadFlag={setDataLoadFlagMeterTotals}
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