import React, { useState, useEffect } from 'react';
import { equipmentList } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const LoadType = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.loadType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_load_type: value.eqpt_load_type
      });
    }

    const getContext = () => {
      axios.all([equipmentList.readLoadTypes()]).then(
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
    <Form.Item label={t('fields.loadType')}>
      {getFieldDecorator('eqpt_load_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectLoadType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.ld_type_code}>
              {item.ld_type_text}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default LoadType;
