import React, { useState, useEffect } from 'react';
import { reportProfile } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Source = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.source')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        report_jasper_file: value.report_jasper_file,
        report_file: value.report_file,
      });
    }

    const getContext = () => {
      axios.all([reportProfile.readReports()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        }),
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  getFieldDecorator('report_file', { rules: [{ required: !!value }] });

  return (
    <Form.Item label={t('fields.source')}>
      {getFieldDecorator('report_jasper_file', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectSource') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Source;
