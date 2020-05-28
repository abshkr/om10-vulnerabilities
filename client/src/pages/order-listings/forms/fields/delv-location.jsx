import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';

const DeliveryLocation = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.DELV_LOCATIONS);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    /*
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderDlocName')}`);
    }
    */
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_dloc_code: value.order_dloc_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="order_dloc_code"
      label={t('fields.orderDlocName')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        disabled={(pageState==='create'||pageState==='edit')? false : true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDeliveryLocation') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.delv_code}>
            {item.delv_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DeliveryLocation;
