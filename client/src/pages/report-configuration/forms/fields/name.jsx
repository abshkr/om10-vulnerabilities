import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { reportConfiguration } from '../../../../api';

const Name = ({ form, value, t, data, source }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    const match = _.find(data, value => {
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
    if (!!value) {
      setFieldsValue({
        report_file: value.report_file,
      });
    }

    const getContext = () => {
      axios.all([reportConfiguration.readReports()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        }),
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        report_file: undefined,
      });
    }
  }, [source, setFieldsValue, value]);

  return (
    <Form.Item label={t('fields.reportName')}>
      {getFieldDecorator('report_file', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectReportName') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map(item => (
            <Select.Option key={item.report_file} value={item.report_file}>
              {item.report_name}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Name;
