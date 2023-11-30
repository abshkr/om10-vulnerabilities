import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import api, { ALLOCATIONS } from '../../../../api';

const SuppCompany = ({ form, value, type, onChange, exchange, owner }) => {
  const { setFieldsValue } = form;
  const [options, setOptions] = useState(null);
  const [label, setLabel] = useState('');

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${label}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (type === '1' && exchange && !!owner && owner !== 'BaSePrOd') {
      setLabel(t('fields.allocExchangeCompany'));
    } else {
      setLabel(t('fields.company'));
    }
  }, [type, exchange, owner]);

  useEffect(() => {
    if (type) {
      let url = `${ALLOCATIONS.SUPPLIERS}`;
      if (type == 2) {
        url = `${ALLOCATIONS.CARRIERS}`;
      } else if (type == 3) {
        url = `${ALLOCATIONS.CUSTOMERS}`;
      } else if (type == 4) {
        url = `${ALLOCATIONS.DRAWERS}`;
      }

      api.get(url).then((response) => {
        const payload = response.data?.records || [];
        setOptions(payload);
      });
    }
  }, [type]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_cmpycode: value.alloc_cmpycode,
      });
      onChange(value.alloc_cmpycode);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item name="alloc_cmpycode" label={label} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        // loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SuppCompany;
