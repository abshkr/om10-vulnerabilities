import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { REPORT_CONFIGURATION } from '../../../../api';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(REPORT_CONFIGURATION.REPORTS);
  const { data } = useSWR(REPORT_CONFIGURATION.READ);

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const source = getFieldValue('report_cmpycode');

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, value => {
      return value.report_cmpycode === source && value.report_file === input;
    });

    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.reportName')}`);
    }

    if (!!match & !value) {
      callback(t('descriptions.alreadyExists'));
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_file: value.report_file
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        report_file: undefined
      });
    }
  }, [source, setFieldsValue, value]);

  return (
    <Form.Item label={t('fields.reportName')}>
      {getFieldDecorator('report_file', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectReportName') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map(item => (
            <Select.Option key={item.report_file} value={item.report_file}>
              {item.report_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Name;
