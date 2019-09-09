import React, { useState, useEffect } from 'react';

import { equipmentList } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Owner = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_owner: value.eqpt_owner
      });
    }

    const getContext = () => {
      axios.all([equipmentList.readOwners()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        })
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.owner')}`);
    }

    callback();
  };

  return (
    <Form.Item label={t('fields.owner')}>
      {getFieldDecorator('eqpt_owner', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectOwner') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Owner;
