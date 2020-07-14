import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const BaseProduct = ({ form, value, setBase }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: baseProducts, isValidating } = useSWR(PRODUCT_MOVEMENTS.BASES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.class')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_prdctlnk: value.pmv_prdctlnk,
      });
    }
  }, [value]);

  return (
    <Form.Item
      name="pmv_prdctlnk"
      label={t('fields.baseProduct')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        // loading={isValidating}
        showSearch
        disabled={value}
        onChange={setBase}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBaseProduct') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {baseProducts
          ? baseProducts.records.map((item, index) => (
              <Select.Option key={index} value={item.base_code}>
                {item.base_desc}
              </Select.Option>
            ))
          : null}
      </Select>
    </Form.Item>
  );
};

export default BaseProduct;
