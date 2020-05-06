import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { PRODUCT_GROUPS } from '../../../../api';

const ProductGroup = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PRODUCT_GROUPS.READ_GROUPS);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.productGroup')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cpm_pgr_code: value.cpm_pgr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="cpm_pgr_code"
        label={t('fields.productGroup')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectGroup') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.pgr_code}>
              {`${item.pgr_code} - ${item.pgr_description}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default ProductGroup;
