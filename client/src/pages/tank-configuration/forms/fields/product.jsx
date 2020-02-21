import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { TANKS } from '../../../../api';

const Product = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKS.BASE_LIST);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.baseProductName')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_base: value.tank_base
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.baseProductName')}>
      {getFieldDecorator('tank_base', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectBaseProduct') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.base_code}>
              {item.base_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Product;
