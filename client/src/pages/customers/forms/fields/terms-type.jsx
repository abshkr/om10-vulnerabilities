import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMERS } from '../../../../api';
import { Form, Select } from 'antd';

const TermsType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMERS.TERMS_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.custCrdTerms')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_crd_terms: String(value.cust_crd_terms),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_crd_terms"
      label={t('fields.custCrdTerms')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTermsType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.terms_type_id}>
            {item.terms_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default TermsType;
