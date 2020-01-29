import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Form, Select } from 'antd';
import { BASE_PRODUCTS } from '../../../../api';

const Group = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        base_prod_group: value.base_prod_group
      });
    }

    const getContext = () => {
      axios.all([BASE_PRODUCTS.readBaseProductGroups()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        })
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.group')}>
      {getFieldDecorator('base_prod_group')(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectGroup') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.pgr_code}>
              {item.pgr_text}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Group;
