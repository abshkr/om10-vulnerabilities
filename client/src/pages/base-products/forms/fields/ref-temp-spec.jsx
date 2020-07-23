import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BASE_PRODUCTS } from '../../../../api';

const RefSpecTemp = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.REF_TEMP);

  useEffect(() => {
    setFieldsValue({
      base_ref_temp_spec: value ? value.base_ref_temp_spec : '1'
    });
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="base_ref_temp_spec" label={t('fields.refTempSpec')}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectRefTempSpec') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ref_temp_spec_id}>
            {item.ref_temp_spec_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default RefSpecTemp;
