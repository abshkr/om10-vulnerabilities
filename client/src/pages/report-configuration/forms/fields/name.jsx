import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { REPORT_CONFIGURATION } from '../../../../api';

const Name = ({ form, value, company }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(REPORT_CONFIGURATION.REPORTS);
  const { data } = useSWR(REPORT_CONFIGURATION.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const match = _.find(data?.records, value => {
      return value.report_cmpycode === company && value.report_file === input;
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.reportName')}`);
    }

    if (!!match & !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    return Promise.resolve();
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
  }, [company, setFieldsValue, value]);

  return (
    <Form.Item
      name="report_file"
      label={t('fields.reportName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
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
    </Form.Item>
  );
};

export default Name;
