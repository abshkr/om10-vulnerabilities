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
      callback(`${t('validate.select')} ─ ${t('fields.equipmentType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_etp: value.eqpt_etp
      });
    }

    const getContext = () => {
      axios.all([equipmentList.readEquipmentTypes()]).then(
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
    <Form.Item label={t('fields.equipmentType')}>
      {getFieldDecorator('eqpt_etp', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isLoading}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectEquipmentType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.etyp_id}>
              {item.etyp_title}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default EquipmentType;
