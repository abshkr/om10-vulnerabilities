import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { ON_DEMAND_REPORTS } from 'api';

const Product = ({ form, param, supplier, setField }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${ON_DEMAND_REPORTS.PRODUCTS}?supplier_code=${supplier}`);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.product')}`);
    }

    return Promise.resolve();
  };

  const onProductChange = (value) => {
    console.log('..........products', value);
  };

  useEffect(() => {
    if (param) {
      setField(param);
    }
  }, [param]);

  const itemLayout = {
    labelCol: { span: 6 },
    labelAlign: 'left',
  };

  return (
    <Form.Item
      form={form}
      name={param}
      label={t('fields.product')}
      rules={[{ required: true, validator: validate }]}
      {...itemLayout}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        mode="multiple"
        onChange={onProductChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectDrawerProduct')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={`${item.prod_cmpy},${item.prod_code}`}>
            {`${item.prod_code} - ${item.prod_name} [${item.prod_cmpy} - ${item.supplier_name}]`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Product;
