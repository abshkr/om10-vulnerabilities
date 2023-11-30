import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Supplier = ({ form, value, type, onChange, multiAllocFlag }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.SUPPLIERS);
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    if (options) {
      if (type === '1' || (type === '3' && multiAllocFlag)) {
        // need add BaSePrOd
        const newOptions = [];
        const extraBaseDesc = ` (${t('fields.baseProduct')})`;
        const baseDesc = `${'BaSePrOd - Base Allocation'}${type === '3' ? extraBaseDesc : ''}`;
        newOptions.push({
          cmpy_code: 'BaSePrOd',
          cmpy_name: 'Base Allocation',
          cmpy_desc: baseDesc,
        });
        const extraDrawerDesc = ` (${t('fields.drawerProduct')})`;
        for (let i = 0; i < options?.records?.length; i++) {
          const item = options?.records?.[i];
          const drawerDesc = `${item?.cmpy_desc}${type === '3' ? extraDrawerDesc : ''}`;
          item.cmpy_desc = drawerDesc;
          newOptions.push(item);
        }
        setItems(newOptions);
      } else {
        setItems(options?.records);
      }
    }
  }, [type, multiAllocFlag, options]);

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

export default Supplier;
