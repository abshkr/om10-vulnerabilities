import React, { useState, useEffect } from 'react';
import { equipmentList } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const EquipmentType = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.area')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_area: value.eqpt_area
      });
    }

    const getContext = () => {
      axios.all([equipmentList.readAreas()]).then(
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
    <Form.Item label={t('fields.area')}>
      {getFieldDecorator('eqpt_area', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectArea') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.area_k}>
              {item.area_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default EquipmentType;
