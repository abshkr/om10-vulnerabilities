import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_METERS } from '../../../../api';

const Type = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_METERS.TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.meterType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bam_type: value.bam_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="bam_type"
      label={t('fields.meterType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ba_meter_id}>
            {item.ba_meter_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
