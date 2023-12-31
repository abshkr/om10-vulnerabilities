import React, { useState, useEffect } from 'react';

import {
  Card,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';

import { DataTable, Download } from '../../../components';
import { TerminalList } from 'components/fields';
import api, { BASE_OWNERS, BASE_PRODUCTS, ORDER_LISTINGS } from '../../../api';
import columns from './columns';
import transform from './transform';
// import BaseOwnerTransactions from '../base-owner-trans-io';
// import BaseOwnerTransactions from '../base-owner-trans';
import BaseOwnerTransactions from '../ownership-transactions';
import BaseOwnerReasons from '../../../pages/base-owner-reasons';

const { TabPane } = Tabs;

const BaseProductOwners = ({ value, access, config, unit, units }) => {
  const [volUnit, setVolUnit] = useState(unit);
  const [terminal, setTerminal] = useState('');
  const [base, setBase] = useState(value?.base_code);
  const [supplier, setSupplier] = useState(undefined);
  const [showMakeTransactions, setShowMakeTransactions] = useState(false);
  const [showOwnerTrsaReason, setShowOwnerTrsaReason] = useState(false);
  const [selected, setSelected] = useState(undefined);

  const url = `${BASE_OWNERS.READ}?base_code=${base || '-1'}&cmpy_code=${
    supplier || '-1'
  }&terminal=${terminal}`;
  const { data, isValidating } = useSWR(url);

  const { data: bases } = useSWR(BASE_PRODUCTS.READ);
  const { data: suppliers } = useSWR(ORDER_LISTINGS.SUPPLIERS);

  const isLoading = isValidating || !data;

  const payload = transform(data?.records, volUnit);
  // const payload = data?.records;

  const { t } = useTranslation();

  const [form] = Form.useForm();
  const percentPrecision = 4;
  const hideUnits = false;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const fields = columns(t, true, config);

  const onFormClose = () => {
    setShowMakeTransactions(false);
    mutate(url);
  };

  const onRowSelected = (value) => {
    setSelected(value);
  };

  const modifiers = (
    <>
      {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginRight: 5 }}
          disabled={false}
          onClick={() => setShowOwnerTrsaReason(true)}
        >
          {t('tabColumns.ownerTrsaReasons')}
        </Button>
      )}

      <Download
        // data={data?.records}
        data={payload}
        isLoading={isLoading}
        columns={fields}
      />

      {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginLeft: 5 }}
          // disabled={!CAN_MAKE_TRANSACTIONS || !mainTabOn}
          onClick={() => setShowMakeTransactions(true)}
        >
          {t('operations.ownershipTransactions')}
        </Button>
      )}
    </>
  );

  useEffect(() => {
    if (value?.base_code) {
      setBase(value?.base_code);
      setSupplier(undefined);
    }
  }, [value?.base_code]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={24}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.baseProduct')} span={1}>
                {/* value?.base_code + ' - ' + value?.base_name */}
                <Select
                  popupMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={base}
                  value={base}
                  onChange={setBase}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectBaseProduct')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bases?.records?.map((item) => {
                    return (
                      <Select.Option key={item.base_code} value={item.base_code}>
                        {item.base_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.supplier')} span={1}>
                <Select
                  popupMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={supplier}
                  value={supplier}
                  onChange={setSupplier}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectSupplier')}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {suppliers?.records?.map((item) => {
                    return (
                      <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                        {item.cmpy_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
              {hideUnits && (
                <Descriptions.Item label={t('fields.volumeUnit')} span={1}>
                  <Select
                    popupMatchSelectWidth={false}
                    allowClear
                    key="1"
                    style={{ width: '100%' }}
                    defaultValue={unit}
                    onChange={setVolUnit}
                  >
                    {units.map((item) => {
                      return (
                        <Select.Option key={item.code} value={item.code}>
                          {item.title}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Descriptions.Item>
              )}

              {config?.siteUseMultiTerminals && (
                <Descriptions.Item label={t('fields.terminal')} span={1}>
                  <TerminalList
                    value={terminal}
                    listOptions={[]}
                    itemCode={'terminal'}
                    itemTitle={'terminal'}
                    itemRequired={false}
                    itemDisabled={false}
                    onChange={setTerminal}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div style={{ float: 'right' }}>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              // data={data?.records}
              data={payload}
              parentHeight={'calc(100vh - 360px)'}
              onClick={(payload) => onRowSelected(payload)}
              handleSelect={(payload) => onRowSelected(payload[0])}
            />
          </Col>
        </Row>
      </Card>
      {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
        <Drawer
          title={t('tabColumns.baseOwnerTransactions')}
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => onFormClose()}
          open={showMakeTransactions}
          width="80vw"
          destroyOnClose={true}
          maskClosable={false}
        >
          <BaseOwnerTransactions
            baseCode={base}
            suppCode={supplier}
            bases={bases}
            suppliers={suppliers}
            access={access}
            value={selected}
            config={config}
          />
        </Drawer>
      )}
      {config?.siteUseProdOwnership && config?.siteProdOwnershipLevel !== 'TANK' && (
        <Drawer
          title={t('tabColumns.ownerTrsaReasons')}
          placement="right"
          styles={{ body: { paddingTop: 5 } }}
          onClose={() => setShowOwnerTrsaReason(false)}
          open={showOwnerTrsaReason}
          width="70vw"
          destroyOnClose={true}
        >
          <BaseOwnerReasons access={access} />
        </Drawer>
      )}
    </>
  );
};

export default BaseProductOwners;
