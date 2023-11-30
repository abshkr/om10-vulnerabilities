import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const BaseSupplier = ({ form, value, type, company, onChangeSupplier, onChangeOwner, multiAllocFlag }) => {
  const { setFieldsValue, getFieldValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.SUPPLIERS);
  const [items, setItems] = useState([]);
  const [label, setLabel] = useState(t('fields.allocExchangeSupplier'));

  const handleSelection = (v) => {
    if (v === 'BaSePrOd') {
      onChangeSupplier(v);
      onChangeOwner(undefined);
      setLabel(t('fields.supplier'));
    } else {
      onChangeSupplier('BaSePrOd');
      onChangeOwner(v);
      setLabel(t('fields.allocExchangeSupplier'));
    }
  };

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${label}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      const supp =
        !!value.alloc_ownercode && value.alloc_ownercode !== 'BaSePrOd'
          ? value.alloc_ownercode
          : value.alloc_suppcode;
      setFieldsValue({
        alloc_suppcode: supp,
      });
      handleSelection(supp);
    }
  }, [value, setFieldsValue, handleSelection]);

  useEffect(() => {
    console.log('.............................base supp');
    if (type === '1') {
      const supplier = getFieldValue('alloc_suppcode');
      if (supplier !== 'BaSePrOd') {
        setLabel(t('fields.allocExchangeSupplier'));
      } else {
        setLabel(t('fields.supplier'));
      }
    }
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
          if (type === '1' && item.cmpy_code === company) {
            const supplier = getFieldValue('alloc_suppcode');
            if (supplier === company) {
              setFieldsValue({
                alloc_suppcode: 'BaSePrOd',
              });
              handleSelection('BaSePrOd');
            }
            continue;
          }
          const drawerDesc = `${item?.cmpy_desc}${type === '3' ? extraDrawerDesc : ''}`;
          item.cmpy_desc = drawerDesc;
          newOptions.push(item);
        }
        setItems(newOptions);
      } else {
        setItems(options?.records);
      }
    }
  }, [type, company, multiAllocFlag, options]);

  return (
    <Form.Item name="alloc_suppcode" label={label} rules={[{ required: type !== '1', validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        onChange={handleSelection}
        // disabled={!!value || type === '1'}
        disabled={!!value}
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

export default BaseSupplier;
