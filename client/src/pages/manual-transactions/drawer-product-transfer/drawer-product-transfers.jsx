import React, { useState, useEffect } from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Tabs, Divider, Card, Row, Col, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';

import api, { MANUAL_TRANSACTIONS } from '../../../api';
import {calcBaseRatios} from '../../../utils'

import BaseProductTransfers from './base-product-transfers';
import BaseProductTotals from './base-product-totals';
import MeterTransfers from './meter-transfers';
import MeterTotals from './meter-totals';

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

  const { t } = useTranslation();
  //const { setFieldsValue } = form;

  //const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [tableBaseTransfersAPI, setTableBaseTransfersAPI] = useState(null);

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
      console.log('DrawerProductTransfers: calcBaseQuantity', base);
    });

  }

  const onCalculate = async () => {
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
  };

  const onCellUpdate = (value) => {
    console.log('DrawerProductTransfers: onCellUpdate', value);
    console.log('DrawerProductTransfers: onCellUpdate2', value?.colDef?.field, value?.colDef?.headerName, value?.value, value?.newValue, value?.data.trsf_cmpt_capacit);
    if (
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
    }
    setSelected({
      ...value?.data,
    });
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
    console.log("DrawerProductTransfers: dptrsf selected", selected);
    if (selected) {
      //adjustProduct(selected.trsf_cmpt_no, form.getFieldValue('base_transfers'));
    }
  }, [selected]);

  useEffect(() => {
    console.log("DrawerProductTransfers: dptrsf clicked", clicked);
  }, [clicked]);

  useEffect(() => {
    console.log("DrawerProductTransfers: dptrsf data?.records", data?.records);
  }, [data]);

  useEffect(() => {
    console.log("DrawerProductTransfers: dp transfers sourceType", sourceType);
    /* form.setFieldsValue({
      transfers: [],
    }); */
    setPayload([]);
  }, [sourceType]);

  useEffect(() => {
    const values = columns(t, form, sourceType, loadType, loadNumber, setPayload, payload, products);

    setFields(values);
  }, [t, form, sourceType, loadType, loadNumber, setPayload, payload, products]);

  useEffect(() => {
    if (dataLoadFlagDrawTransfers) {
      console.log("data loading from DB, don't need build the transfers from scratch.");
      return;
    }

    setPayload([]);

    console.log('watch data, supplier, trip, order, tanker', data, supplier, trip, order, tanker);

    if (data) {
      const transformed = [];
      console.log('watch data, supplier, trip, order, tanker in IF, data not null', data);

      _.forEach(data?.records, (record) => {
        //console.log('watch data, supplier, trip, order, tanker in loop', record?.shls_supp);
        if (record.shls_supp !== '') {
          //console.log('watch data, supplier, trip, order, tanker in if supplier', record?.shls_supp);
          const object = {
            trsf_sold_to: record?.customer_code,
            trsf_delv_num: record?.delivery_number,
            trsf_delv_loc: record?.delivery_location,
            trsf_equip_id: record?.eqpt_code,
            trsf_cmpt_no: record?.tnkr_cmpt_no,
            trsf_cmpt_capacit: record?.cmpt_capacit,
            trsf_drwr_cd: record?.shls_supp,
            trsf_prod_code: record?.prod_code,
            trsf_prod_name: record?.prod_name === '' ? t('placeholder.selectDrawerProduct') : record?.prod_name,
            trsf_prod_cmpy: record?.shls_supp,
            trsf_arm_cd: t('placeholder.selectArmCode'),
            trsf_qty_plan: record?.allowed_qty==='' ? null : record?.allowed_qty,
            trsf_qty_left: record?.allowed_qty==='' ? null : String(_.toNumber(record?.allowed_qty) - _.toNumber(record?.load_qty)),
            trsf_density: null,
            trsf_temp: null,
            trsf_qty_amb: null,
            trsf_qty_cor: null,
            trsf_load_kg: null,
          };

          transformed.push(object);
        }
      });

      /* form.setFieldsValue({
        transfers: transformed,
      }); */
      console.log('watch data, supplier, trip, order, tanker, transformed', transformed);

      setPayload(transformed);
    }
  }, [data, supplier, trip, order, tanker]);

  useEffect(() => {
    console.log('Inside drawer transfers to setFieldsValue, the data is ', payload);
    if (payload) {
      form.setFieldsValue({
        transfers: payload,
      });
    }
  }, [payload]);

  useEffect(() => {
    console.log('Inside drawer transfers to setFieldsValue, the data is ', dataLoadFlagDrawTransfers);
    if (dataLoadFlagDrawTransfers) {
      if (payload) {
        form.setFieldsValue({
          transfers: payload,
        });
      }
      setDataLoadFlagDrawTransfers(false);
    }
  }, [dataLoadFlagDrawTransfers]);

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
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        style={{ marginRight: 5 }}
        onClick={onDelete}
        disabled={!clicked}
      >
        {t('operations.deleteTransfer')}
      </Button>

      <Button
        type="primary"
        icon={<UndoOutlined />}
        onClick={onCalculate}
        style={{ marginRight: 5 }}
        disabled={
          !clicked || 
          !clicked?.trsf_temp || 
          !clicked?.trsf_density || 
          (!clicked?.trsf_qty_amb && !clicked?.trsf_qty_cor && !clicked?.trsf_load_kg)
        }
      >
        {t('operations.calculateDrawer')}
      </Button>

      <Button 
        type="primary" 
        icon={<UndoOutlined />} 
        onClick={onRestore}
        style={{ marginRight: 5 }} 
        disabled={!selected}>
        {t('operations.getTankDensities')}
      </Button>
    </>
  );

  return (
    <>
      <Row gutter={[1,8]}>
        <Col span={24}>
        </Col>
      </Row>
      <Card size="small" title={t('divider.drawerProductTransfer')}>
        <Form.Item name="transfers" noStyle>
          <DataTable
            parentHeight="200px"
            data={payload}
            extra={modifiers}
            columns={fields}
            components={components}
            apiContext={setTableAPI}
            onCellUpdate={(value) => onCellUpdate(value)}
            handleSelect={(value) => setClicked(value[0])}
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
              clicked={clicked}
              setChildTableAPI={setTableBaseTransfersAPI}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataBaseTransfers}
              setData={setDataBaseTransfers}
              dataLoadFlag={dataLoadFlagBaseTransfers}
              setDataLoadFlag={setDataLoadFlagBaseTransfers}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.cumulativeBaseProduct')} key="2" forceRender={true}>
            <BaseProductTotals 
              form={form} 
              sourceType={sourceType} 
              selected={selected} 
              transfers={payload} 
              clicked={clicked}
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataBaseTotals}
              setData={setDataBaseTotals}
              dataLoadFlag={dataLoadFlagBaseTotals}
              setDataLoadFlag={setDataLoadFlagBaseTotals}
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
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataMeterTransfers}
              setData={setDataMeterTransfers}
              dataLoadFlag={dataLoadFlagMeterTransfers}
              setDataLoadFlag={setDataLoadFlagMeterTransfers}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.cumulativeMeterTotals')} key="2" forceRender={true}>
            <MeterTotals 
              form={form} 
              sourceType={sourceType} 
              selected={selected} 
              transfers={payload} 
              dataBoard={dataBoard}
              setDataBoard={setDataBoard}
              data={dataMeterTotals}
              setData={setDataMeterTotals}
              dataLoadFlag={dataLoadFlagMeterTotals}
              setDataLoadFlag={setDataLoadFlagMeterTotals}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default DrawerProductTransfers;
