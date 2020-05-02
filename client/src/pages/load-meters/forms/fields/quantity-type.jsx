import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_METERS } from '../../../../api';

const QuantityType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_METERS.UNIT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.meterQuantityType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bam_qty_type: value.bam_qty_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="bam_qty_type"
      label={t('fields.meterQuantityType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
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
