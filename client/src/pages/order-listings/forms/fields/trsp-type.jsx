import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { ORDER_LISTINGS } from '../../../../api';
import { Form, Select } from 'antd';

const TransportType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ORDER_LISTINGS.TRANSPORT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderTtypName')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ttyp_id: String(value.order_ttyp_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="order_ttyp_id"
      label={t('fields.orderTtypName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        disabled={(pageState==='create'||pageState==='edit')? false : true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTrspType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.transport_id}>
            {item.transport_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TransportType;
