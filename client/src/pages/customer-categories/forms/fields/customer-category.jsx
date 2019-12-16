import React, { useState, useEffect } from 'react';
import { equipmentList } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const CustomerCategory = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        category_count: value.category_count,
      });
    }

    const getContext = () => {
      axios.all([equipmentList.readLoadTypes()]).then(
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
    <Form.Item label={t('fields.customerCategory')}>
      {getFieldDecorator('category_count')(
        <Select
          loading={isLoading}
          showSearch
          disabled={!value}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.ld_type_code}>
              {item.ld_type_text}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default CustomerCategory;
