import React, { useState, useEffect } from 'react';
import { logicalPrinters } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Usage = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.usage')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        prt_usage_name: value.prt_usage_name,
      });
    }

    const getContext = () => {
      axios.all([logicalPrinters.readLogicalPrinters()]).then(
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
    <Form.Item label={t('fields.usage')}>
      {getFieldDecorator('prt_usage_name', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          showSearch
          disabled={!!value}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectUsage') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.prt_cmpy}>
              {item.prt_cmpy_name}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Usage;
