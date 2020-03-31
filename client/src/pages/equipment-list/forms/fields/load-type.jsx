import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { EQUIPMENT_LIST } from '../../../../api';

const LoadType = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(EQUIPMENT_LIST.LOAD_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.loadType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_load_type: value.eqpt_load_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="eqpt_load_type"
      label={t('fields.loadType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectLoadType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ld_type_code}>
            {item.ld_type_text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default LoadType;
