import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { DELV_LOCATIONS } from '../../../../api';
import { Form, Select } from 'antd';

const QuantityType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DELV_LOCATIONS.QTY_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvQtyType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_qty_typeid: String(value.delv_qty_typeid),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_qty_typeid"
      label={t('fields.delvQtyType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectQtyType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.qty_id}>
            {item.qty_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default QuantityType;
