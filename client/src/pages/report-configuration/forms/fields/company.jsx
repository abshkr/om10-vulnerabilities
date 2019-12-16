import React, { useState, useEffect } from 'react';
import { reportConfiguration } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Company = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        report_cmpycode: value.report_cmpycode,
      });
    }

    const getContext = () => {
      axios.all([reportConfiguration.readCompany()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        }),
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.company')}>
      {getFieldDecorator('report_cmpycode', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectCompany') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map(item => (
            <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
              {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Company;
