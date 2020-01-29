import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Form, Select } from 'antd';
import { BASE_PRODUCTS } from '../../../../api';

const CorrectionMethod = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_corr_mthd: value.base_corr_mthd
      });
    }

    const getContext = () => {
      axios.all([BASE_PRODUCTS.readBaseProductCorrectionMethods()]).then(
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
    <Form.Item label={t('fields.correctionMethod')}>
      {getFieldDecorator('base_corr_mthd')(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectCorrectionMethod') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.compensation_id}>
              {item.compensation_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default CorrectionMethod;
