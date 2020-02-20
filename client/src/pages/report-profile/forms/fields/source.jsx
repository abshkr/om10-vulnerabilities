import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { REPORT_PROFILE } from '../../../../api';

const Source = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(REPORT_PROFILE.REPORTS);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.source')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_jasper_file: value.report_jasper_file,
        report_file: value.report_file
      });
    }
  }, [value, setFieldsValue]);

  getFieldDecorator('report_file', { rules: [{ required: !!value }] });

  return (
    <Form.Item label={t('fields.source')}>
      {getFieldDecorator('report_jasper_file', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectSource') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Source;
