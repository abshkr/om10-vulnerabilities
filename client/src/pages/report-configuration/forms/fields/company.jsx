import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { REPORT_CONFIGURATION } from '../../../../api';

const Company = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(REPORT_CONFIGURATION.COMPANY);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_cmpycode: value.report_cmpycode,
      });

      onChange(value.report_cmpycode);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="report_cmpycode"
      label={t('fields.reportCmpyname')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item) => (
          <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
            {item.cmpy_code + ' - ' + item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Company;
