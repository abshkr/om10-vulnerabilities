import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const CustSupplier = ({ form, value, type, onChange, onChangeSupplier, onChangeOwner, baseFlag }) => {
  const { setFieldsValue, getFieldValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.SUPPLIERS);
  const [items, setItems] = useState([]);

  const handleSelection = (v) => {
    if (baseFlag) {
      onChangeSupplier('BaSePrOd');
      onChangeOwner(v);
    } else {
      onChangeSupplier(v);
      onChangeOwner(undefined);
    }
  };

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.supplier')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      const supp = baseFlag ? value.alloc_ownercode : value.alloc_suppcode;
      setFieldsValue({
        alloc_suppcode: supp,
      });
      handleSelection(supp);
    }
  }, [value, setFieldsValue, baseFlag, handleSelection]);

  useEffect(() => {
    if (value) {
      const supp = baseFlag ? value.alloc_ownercode : value.alloc_suppcode;
      setFieldsValue({
        alloc_suppcode: supp,
      });
      handleSelection(supp);
    }
  }, [value, setFieldsValue, baseFlag, handleSelection]);

  useEffect(() => {
    if (options) {
      setItems(options?.records);
    }
  }, [options]);

  useEffect(() => {
    const supp = getFieldValue('alloc_suppcode');
    handleSelection(supp);
  }, [baseFlag, handleSelection]);

  return (
    <Form.Item
      name="alloc_suppcode"
      label={t('fields.supplier')}
      rules={[{ required: type !== '1', validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
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
        {items?.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustSupplier;
