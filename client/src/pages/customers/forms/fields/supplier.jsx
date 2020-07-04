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
    console.log("supplier validate")
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.custSupplier')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_supp_code: value.cust_supp_code,
      });

      onChange(value.cust_supp_code);
    } else {
      /* setFieldsValue({
        cust_supp_code: null,
      }); */
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="cust_supp_code"
      label={t('fields.custSupplier')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={onChange}
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
