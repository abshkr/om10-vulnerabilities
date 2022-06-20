import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BASE_PRODUCTS } from '../../../../api';

const CorrectionMethod = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.CORRECTION_METHOD);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseCorrMthd')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_corr_mthd: value.base_corr_mthd,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="base_corr_mthd"
      label={t('fields.baseCorrMthd')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCorrectionMethod') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.compensation_id}>
            {item.compensation_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CorrectionMethod;
