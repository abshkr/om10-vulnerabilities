import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDER_LISTINGS } from '../../../../api';

const Carrier = ({ form, value, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.CARRIERS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderCarrName')}`);
      }
    }

    return Promise.resolve();
  };

  const onCarrierChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_carr_code: value.order_carr_code,
      });

      onChange(value.order_carr_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="order_carr_code"
      label={t('fields.orderCarrName')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        onChange={onCarrierChange}
        disabled={true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCarrier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Carrier;
