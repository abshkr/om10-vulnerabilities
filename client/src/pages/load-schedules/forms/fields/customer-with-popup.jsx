import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Button, Row, Col, Modal } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';
import CustomerProduct from '../../../customers/forms/customer_product/customer_product';
import CustomerCarrier from '../../../customers/forms/customer_carrier/customer_carrier';

const Customer = ({ form, supplier, value, onChange, config }) => {
  const { t } = useTranslation();

  const [products, setProducts] = useState(undefined);
  const [carriers, setCarriers] = useState(undefined);
  const [account, setAccount] = useState(value?.shls_cust);

  const onProduct = !value && config?.site_customer_product;
  const onCarrier = !value && config?.site_customer_carrier;

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
    const modal = Modal.info();
    modal.update({
      title: t('tabColumns.customerProduct'),
      okText: t('operations.exit'),
      centered: true,
      width: '50vw',
      maskClosable: false,
      okButtonProps: {
        hidden: false,
      },
      content: (
        <Form>
          <CustomerProduct form={form} value={{ cust_account: account }} changeProducts={setProducts} />
        </Form>
      ),
    });
  };

  const handleCustomerCarriers = () => {
    const modal = Modal.info();
    modal.update({
      title: t('tabColumns.customerProduct'),
      okText: t('operations.exit'),
      centered: true,
      width: '50vw',
      maskClosable: false,
      okButtonProps: {
        hidden: false,
      },
      content: (
        <Form>
          <CustomerCarrier form={form} value={{ cust_account: account }} changeCarriers={setCarriers} />
        </Form>
      ),
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
    <Row gutter={[8, 8]}>
      <Col span={onProduct && onCarrier ? 14 : onProduct || onCarrier ? 19 : 24}>
        <Form.Item
          name="shls_cust"
          label={t('fields.customer')}
          rules={[{ required: true, validator: validate }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            loading={isValidating}
            showSearch
            allowClear
            onChange={handleSelection}
            disabled={!!value}
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
      </Col>
      {onProduct && (
        <Col span={5} style={{ paddingTop: '34px' }}>
          <Button disabled={!account} onClick={() => handleCustomerProducts()}>
            {t('operations.linkProducts')}
          </Button>
        </Col>
      )}
      {onCarrier && (
        <Col span={5} style={{ paddingTop: '34px' }}>
          <Button disabled={!account} onClick={() => handleCustomerCarriers()}>
            {t('operations.linkCarriers')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default Customer;
