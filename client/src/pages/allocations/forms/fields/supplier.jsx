import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Supplier = ({ form, value, type, onChange }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.SUPPLIERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.supplier')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_suppcode: value.alloc_suppcode,
      });
      onChange(value.alloc_suppcode);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="alloc_suppcode"
      label={t('fields.supplier')}
      rules={[{ required: type !== '1', validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}	  
        loading={isValidating}
        onChange={onChange}
        disabled={!!value || type === '1'}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplier') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
