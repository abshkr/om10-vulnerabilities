import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Supplier = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.SUPPLIERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.supplier')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_supplier: value.kya_supplier,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_supplier"
      label={t('fields.schdSupplier')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplier') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {config?.siteAllowAnySuppDrawTag && (
          <Select.Option key={options?.records?.length + 1} value={'ANY'}>
            {'ANY - ALL'}
          </Select.Option>
        )}
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
