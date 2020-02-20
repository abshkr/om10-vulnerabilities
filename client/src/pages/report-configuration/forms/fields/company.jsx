import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { REPORT_CONFIGURATION } from '../../../../api';

const Company = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(REPORT_CONFIGURATION.COMPANY);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_cmpycode: value.report_cmpycode
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.company')}>
      {getFieldDecorator('report_cmpycode', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectCompany') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map(item => (
            <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
              {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Company;
