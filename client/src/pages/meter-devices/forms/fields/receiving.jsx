import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { METER_DEVICES } from '../../../../api';

const Receiving = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(METER_DEVICES.SOURCE_TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.receiving')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_dst_code: value.mtd_dst_code
      });

      onChange(value.mtd_dst_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mtd_dst_code"
      label={t('fields.receiving')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectReceiving') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.pmv_id}>
            {item.pmv_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Receiving;
