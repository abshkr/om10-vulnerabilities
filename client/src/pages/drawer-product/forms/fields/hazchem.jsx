import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Hazchem = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.HAZCHEMS);

  const validate = (rule, input) => {
    return Promise.resolve();
  };

  const handleChange = (value) => {
    setFieldsValue({
      prod_hazid: value,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_hazid: value.prod_hazid,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_hazid" label={t('fields.prodHazid')} rules={[{ validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectHazchem') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.hzcf_id}>
            {item.hzcf_detail}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Hazchem;
