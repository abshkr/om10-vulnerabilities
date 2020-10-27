import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Supplier = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.SUPPLIERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.supplier')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        supplier_code: value.supplier_code,
      });

      // onChange(value.supplier_code);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="supplier_code"
      label={t('fields.supplier')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplier') : null}
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

export default Supplier;
