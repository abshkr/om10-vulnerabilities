import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { DELIVERY_DETAILS } from '../../../../api';

const Supplier = ({ form, value, defValue, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(DELIVERY_DETAILS.SUPPLIERS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.ddSuppName')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_supp_code: value.dd_supp_code,
      });
    } else {
      setFieldsValue({
        dd_supp_code: defValue,
      });
    }
  }, [value, setFieldsValue, defValue]);

  return (
    <Form.Item
      name="dd_supp_code"
      label={t('fields.ddSuppName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        disabled={(pageState==='create')? true : true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSupplier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_code + ' - ' + item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Supplier;
