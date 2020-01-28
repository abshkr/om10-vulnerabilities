import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { baseProducts } from '../../../../api';
import axios from 'axios';

const RefSpecTemp = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setFieldsValue({
      base_ref_temp_spec: value ? value.base_ref_temp_spec : '1'
    });

    const getContext = () => {
      axios.all([baseProducts.readBaseProductRefTemp()]).then(
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
    <Form.Item label={t('fields.refTempSpec')}>
      {getFieldDecorator('base_ref_temp_spec')(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectRefTempSpec') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.ref_temp_spec_id}>
              {item.ref_temp_spec_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default RefSpecTemp;
