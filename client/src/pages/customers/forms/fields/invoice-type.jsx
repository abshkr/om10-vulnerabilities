import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMERS } from '../../../../api';
import { Form, Select } from 'antd';

const InvoiceType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMERS.INVOICE_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.custInvoiceType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_invtype_id: String(value.cust_invtype_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_invtype_id"
      label={t('fields.custInvoiceType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectInvoiceType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.invoice_type_id}>
            {item.invoice_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default InvoiceType;
