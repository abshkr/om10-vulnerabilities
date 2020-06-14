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

  const urlBase =
    selected && selected?.trsf_arm_cd !== 'Select Arm Code'
      ? `${MANUAL_TRANSACTIONS.BASE_DETAILS}?prod_cmpy=${selected?.trsf_prod_cmpy}&prod_code=${selected?.trsf_prod_code}&arm_code=${selected?.trsf_arm_cd}&id=dprod`
      : null;
  const { data: baseDetails, isValidating } = useSWR(urlBase);

  const onDelete = () => {
    const filtered = _.reject(payload, ['trsf_cmpt_no', clicked?.trsf_cmpt_no]);

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
    setSelected({
      ...value?.data,
    });
  };

  useEffect(() => {
    if (data?.records[0]?.schd_type) {
      //setLoadType(data?.records[0]?.schd_type);
    }
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      transfers: [],
    });
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
      {/* <Divider orientation="left" style={{ margin: '0px 0' }}>{t('divider.drawerProductTransfer')}</Divider> */}
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
            onCellUpdate={(value) => onCellUpdate(value)}
            handleSelect={(value) => setClicked(value[0])}
          />
        </Form.Item>
      </Card>

      {/* <Divider orientation="left" style={{ margin: '0px 0', marginTop: 10 }}>{t('divider.baseProducts')}</Divider> */}

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

      {/* <Divider orientation="left" style={{ margin: '0px 0' }}>{t('divider.meters')}</Divider> */}

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
