import React, { useState, useEffect } from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Tabs, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';

import { MANUAL_TRANSACTIONS } from '../../../api';

import TransferDetails from './transfer-details';
import ProductQuantities from './product-quantities';
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

const DrawerProductTransfer = ({ form, supplier, trip }) => {
  const { data } = useSWR(
    supplier && trip && `${MANUAL_TRANSACTIONS.DETAILS}?supplier=${supplier}&trip_no=${trip}`
  );

  const { data: drawers } = useSWR(
    supplier && trip && `${MANUAL_TRANSACTIONS.PRODUCTS}?supplier_code=${supplier}&shls_trip_no=${trip}`
  );

  const { t } = useTranslation();

  const [type, setType] = useState(null);
  const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fields, setFields] = useState([]);
  const [clicked, setClicked] = useState(null);

  const onDelete = () => {
    const filtered = _.reject(payload, ['tnkr_cmpt_no', clicked?.tnkr_cmpt_no]);

    setClicked(null);

    form.setFieldsValue({
      transfers: filtered,
    });

    setPayload(filtered);
  };

  const onCalculate = (api) => {
    const payload = form.getFieldValue('products');

    console.log(payload);
  };

  const onCellUpdate = (value) => {
    if (value?.column?.colId === 'arm_code') {
      setSelected({
        ...value?.data,
      });
    }
  };

  useEffect(() => {
    if (data?.records[0]?.schd_type) {
      setType(data?.records[0]?.schd_type);
    }
  }, [data]);

  useEffect(() => {
    const values = columns(t, form, setPayload, payload, type, drawers);

    setFields(values);
  }, [t, form, setPayload, payload, type, drawers]);

  useEffect(() => {
    setPayload([]);

    if (data) {
      const transformed = [];

      _.forEach(data?.records, (record) => {
        if (record.shls_supp !== '') {
          const object = {
            customer_code: record?.customer_code,
            delivery_number: record?.delivery_number,
            delivery_location: record?.delivery_location,
            eqpt_code: record.eqpt_code,
            tnkr_cmpt_no: record.tnkr_cmpt_no,
            drawer_code: record.shls_supp,
            prod_code: record?.prod_code,
            prod_name: record?.prod_name === '' ? t('placeholder.selectDrawerProduct') : record?.prod_name,
            prod_cmpy: record?.shls_supp,
            arm_code: t('placeholder.selectArmCode'),
            dens: null,
            temperature: null,
            cor_vol: null,
            amb_vol: null,
            liq_kg: null,
          };

          transformed.push(object);
        }
      });

      form.setFieldsValue({
        transfers: transformed,
      });

      setPayload(transformed);
    }
  }, [data, supplier, supplier]);

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
        disabled={!selected}
      >
        {t('operations.calculateDrawer')}
      </Button>

      <Button type="primary" icon={<UndoOutlined />} style={{ marginRight: 5 }} disabled={!selected}>
        {t('operations.getTankDensities')}
      </Button>
    </>
  );

  return (
    <>
      <Form.Item name="transfers" noStyle>
        <DataTable
          parentHeight="200px"
          data={payload}
          extra={modifiers}
          columns={fields}
          components={components}
          onCellUpdate={(value) => onCellUpdate(value)}
          handleSelect={(value) => setClicked(value[0])}
        />
      </Form.Item>

      <Divider style={{ margin: '0px 0', marginTop: 10 }}>{t('divider.baseProducts')}</Divider>

      <Tabs defaultActiveKey="1" animated={false} type="card">
        <TabPane tab={t('tabColumns.cumulativeBaseProduct')} key="1">
          <ProductQuantities form={form} selected={selected} transfers={payload} />
        </TabPane>
      </Tabs>

      <Divider style={{ margin: '0px 0' }}>{t('divider.meters')}</Divider>

      <Tabs defaultActiveKey="1" animated={false} type="card">
        <TabPane tab={t('tabColumns.cumulativeMeterTotals')} key="1">
          <MeterTotals form={form} selected={selected} transfers={payload} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default DrawerProductTransfer;
