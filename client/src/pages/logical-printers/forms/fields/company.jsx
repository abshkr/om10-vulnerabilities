import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOGICAL_PRINTERS } from '../../../../api';

const Company = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOGICAL_PRINTERS.COMPANYS);

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        prt_cmpy: value.prt_cmpy
      });
    }
  }, [value, form]);

  return (
    <Form.Item name="prt_cmpy" label={t('fields.company')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Company;
