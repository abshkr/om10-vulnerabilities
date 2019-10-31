import React, { useState, useEffect } from 'react';
import { tanks } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Product = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.baseProductName')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_base: value.tank_base,
      });
    }

    const getContext = () => {
      axios.all([tanks.readBaseList()]).then(
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
    <Form.Item label={t('fields.baseProductName')}>
      {getFieldDecorator('tank_base', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectBaseProduct') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.base_code}>
              {item.base_name}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Product;
