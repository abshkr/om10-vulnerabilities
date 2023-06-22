import React, { useEffect, useState } from 'react';

import useSWR, { SWRConfig } from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Button, Row, Col, Modal } from 'antd';
import { EditOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons';

import _ from 'lodash';
import { fetcher } from 'utils';

import { LOAD_SCHEDULES } from '../../../../api';
import CustomerCarriers from '../customer_carriers';
import CustomerProducts from '../customer-products';
import CustomerLocations from '../customer-locations';

const Customer = ({ form, supplier, value, onChange, config }) => {
  const { t } = useTranslation();

  const [account, setAccount] = useState(value?.shls_cust);

  // const onProduct = !value && config?.site_customer_product;
  // const onCarrier = !value && config?.site_customer_carrier;
  const onProduct = config?.site_customer_product;
  const onCarrier = config?.site_customer_carrier;
  const onLocation = config?.site_customer_product || config?.site_customer_carrier;

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${LOAD_SCHEDULES.SUPP_CUSTOMERS}?supplier=${supplier}`);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.customer')}`);
    }

    return Promise.resolve();
  };

  const handleSelection = (v) => {
    setAccount(v);
    onChange(v);
  };

  const handleCustomerProducts = () => {
    if (!value) {
      onChange(undefined);
    }
    const item = _.find(options?.records, (o) => o?.cust_acnt === account);
    // const modal = Modal.info();
    //modal.update({
    Modal.confirm({
      title: t('tabColumns.customerProduct'),
      okText: t('operations.ok'),
      cancelText: t('operations.cancel'),
      centered: true,
      width: '70vw',
      maskClosable: false,
      closable: true,
      keyboard: true,
      okButtonProps: {
        hidden: false,
      },
      cancelButtonProps: {
        hidden: true,
      },
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, color: '#0054a4' }}>
            {t('fields.custProductLinks')}
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <CustomerProducts
              supplier={item?.cust_supp_code || supplier}
              customer={account}
              disabled={!value ? false : true}
            />
          </div>
        </SWRConfig>
      ),
      onOk: () => {
        console.log('...................okProduct');
        if (!value) {
          onChange(account);
        }
      },
      onCancel: () => {
        console.log('...................cancelProduct');
        if (!value) {
          onChange(account);
        }
      },
    });
  };

  const handleCustomerCarriers = () => {
    if (!value) {
      onChange(undefined);
    }
    const item = _.find(options?.records, (o) => o?.cust_acnt === account);
    // const modal = Modal.info();
    //modal.update({
    Modal.confirm({
      title: t('tabColumns.customerCarrier'),
      okText: t('operations.ok'),
      cancelText: t('operations.cancel'),
      centered: true,
      width: '70vw',
      maskClosable: false,
      closable: true,
      keyboard: true,
      okButtonProps: {
        hidden: false,
      },
      cancelButtonProps: {
        hidden: true,
      },
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, color: '#0054a4' }}>
            {t('fields.custCarrierLinks')}
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <CustomerCarriers customer={account} disabled={!value ? false : true} />
          </div>
        </SWRConfig>
      ),
      onOk: () => {
        console.log('...................okCarrier');
        if (!value) {
          onChange(account);
        }
      },
      onCancel: () => {
        console.log('...................cancelCarrier');
        if (!value) {
          onChange(account);
        }
      },
    });
  };

  const handleCustomerLocations = () => {
    if (!value) {
      onChange(undefined);
    }
    const item = _.find(options?.records, (o) => o?.cust_acnt === account);
    // const modal = Modal.info();
    //modal.update({
    Modal.confirm({
      title: t('tabColumns.customerLocation'),
      okText: t('operations.ok'),
      cancelText: t('operations.cancel'),
      centered: true,
      width: '70vw',
      maskClosable: false,
      closable: true,
      keyboard: true,
      okButtonProps: {
        hidden: false,
      },
      cancelButtonProps: {
        hidden: true,
      },
      content: (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, color: '#0054a4' }}>
            {t('fields.custLocationLinks')}
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <CustomerLocations customer={account} disabled={!value ? false : true} />
          </div>
        </SWRConfig>
      ),
      onOk: () => {
        console.log('...................okLocation');
        if (!value) {
          onChange(account);
        }
      },
      onCancel: () => {
        console.log('...................cancelLocation');
        if (!value) {
          onChange(account);
        }
      },
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_cust: value?.shls_cust,
      });

      setAccount(value?.shls_cust);
    }
  }, [value]);

  return (
    <Form.Item
      name="shls_cust"
      label={
        <>
          {t('fields.customer')}
          <span style={{ width: 20 }}></span>
          {onProduct && (
            <Button
              size="small"
              disabled={!account}
              onClick={() => handleCustomerProducts()}
              icon={<LinkOutlined />}
            >
              {t('operations.linkProducts')}
            </Button>
          )}
          {onCarrier && (
            <Button
              size="small"
              disabled={!account}
              onClick={() => handleCustomerCarriers()}
              icon={<LinkOutlined />}
            >
              {t('operations.linkCarriers')}
            </Button>
          )}
          {onLocation && (
            <Button
              size="small"
              disabled={!account}
              onClick={() => handleCustomerLocations()}
              icon={<LinkOutlined />}
            >
              {t('operations.linkLocations')}
            </Button>
          )}
        </>
      }
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        onChange={handleSelection}
        disabled={!!value}
        // style={{width: '100%'}}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCustomer') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cust_acnt}>
            {item.cust_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
