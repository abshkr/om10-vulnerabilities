import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Class = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: classes, isValidating } = useSWR(PRODUCT_MOVEMENTS.CLASSES);

  const isLoading = isValidating;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.class')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_trans_type: value.pmv_trans_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="pmv_trans_type"
      label={t('fields.class')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isLoading}
        showSearch
        disabled={value}
        optionFilterProp="children"
        placeholder={t('placeholder.selectClass')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {classes?.records.map((item, index) => (
          <Select.Option key={index} value={item.pmv_transfer_class_id}>
            {item.pmv_transfer_class_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Class;
