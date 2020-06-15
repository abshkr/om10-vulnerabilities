import React, { useState, useEffect } from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Tabs, Divider, Card, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';

import { MANUAL_TRANSACTIONS } from '../../../api';
import {calcBaseRatios} from '../../../utils'

import BaseProductTransfers from './base-product-transfers';
import BaseProductTotals from './base-product-totals';
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
  tanker
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

  const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);

  const onDelete = () => {
    const filtered = _.reject(payload, ['trsf_cmpt_no', clicked?.trsf_cmpt_no]);

    setClicked(null);

    form.setFieldsValue({
      transfers: filtered,
    });

    setPayload(filtered);
  };

  const onCalculate = () => {
    /* const transfers = form.getFieldValue('transfers');
    const bases = form.getFieldValue('base_transfers');
    const base_totals = form.getFieldValue('base_totals');
    const meter_totals = form.getFieldValue('meter_totals');

    console.log('onCalculate', transfers, bases, base_totals, meter_totals); */

    const items = form.getFieldsValue(['transfers', 'base_transfers', 'base_totals', 'meter_totals'])    
    console.log('onCalculate', items);
  };

  const onRestore = () => {
    console.log('onRestore');
    //const option = selected;
    //setSelected(null);
    //setSelected(option);
  };

  const onCellUpdate = (value) => {
    console.log('onCellUpdate', value);
    setSelected({
      ...value?.data,
    });
  };

  const adjustProduct = (cmpt, bases) => {
    if (!bases || !cmpt) {
      return;
    }
    console.log('adjustProdcut', cmpt, bases);

    let index = undefined;
    let prodDens = 0.0;

    // calculate drawer product density
    for (index = 0; index < bases.length; index++) {
      const item = bases[index];
      if (item.trsf_bs_cmpt_no === cmpt) {
        prodDens = prodDens + calcBaseRatios(item?.trsf_bs_den, item?.trsf_bs_ratio_value, item?.trsf_bs_ratio_total);
      }
    }
    console.log('prod dens', prodDens);

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
    console.log("dptrsf selected", selected);
    if (selected) {
      //adjustProduct(selected.trsf_cmpt_no, form.getFieldValue('base_transfers'));
    }
  }, [selected]);

  useEffect(() => {
    console.log("dptrsf clicked", clicked);
  }, [clicked]);

  useEffect(() => {
    console.log("dptrsf data?.records", data?.records);
  }, [data]);

  useEffect(() => {
    console.log("dp transfers sourceType", sourceType);
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
    setPayload([]);

    if (data) {
      const transformed = [];

      _.forEach(data?.records, (record) => {
        if (record.shls_supp !== '') {
          const object = {
            trsf_sold_to: record?.customer_code,
            trsf_delv_num: record?.delivery_number,
            trsf_delv_loc: record?.delivery_location,
            trsf_equip_id: record.eqpt_code,
            trsf_cmpt_no: record.tnkr_cmpt_no,
            trsf_drwr_cd: record.shls_supp,
            trsf_prod_code: record?.prod_code,
            trsf_prod_name: record?.prod_name === '' ? t('placeholder.selectDrawerProduct') : record?.prod_name,
            trsf_prod_cmpy: record?.shls_supp,
            trsf_arm_cd: t('placeholder.selectArmCode'),
            trsf_qty_plan: null,
            trsf_qty_left: null,
            trsf_density: null,
            trsf_temp: null,
            trsf_qty_amb: null,
            trsf_qty_cor: null,
            trsf_load_kg: null,
          };

          transformed.push(object);
        }
      });

      form.setFieldsValue({
        transfers: transformed,
      });

      setPayload(transformed);
    }
  }, [data, supplier]);

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
          <TabPane tab={t('tabColumns.transferDetails')} key="1">
            <BaseProductTransfers 
              form={form} 
              sourceType={sourceType} 
              selected={selected} 
              transfers={payload} 
              clicked={clicked}
            />
          </TabPane>
          <TabPane tab={t('tabColumns.cumulativeBaseProduct')} key="2">
            <BaseProductTotals 
              form={form} 
              sourceType={sourceType} 
              selected={selected} 
              transfers={payload} 
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
          <TabPane tab={t('tabColumns.cumulativeMeterTotals')} key="1">
            <MeterTotals 
              form={form} 
              sourceType={sourceType} 
              selected={selected} 
              transfers={payload} 
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default DrawerProductTransfers;
