import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { BASE_PRODUCTS } from '../../../../api';

const Classification = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.CLASSIFICATIONS);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.classification')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_cat: value.base_cat
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.classification')}>
      {getFieldDecorator('base_cat', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectClassification') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.bclass_no}>
              {item.bclass_desc}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Classification;
