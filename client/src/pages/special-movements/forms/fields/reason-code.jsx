import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const index = {
  0: 'R',
  1: 'D',
  2: 'T',
};

const ReasonCode = ({ form, value, type, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(`${SPECIAL_MOVEMENTS.REASONS}?mr_type=${index[type]}`);
  // const { data: options, isValidating } = useSWR(`${SPECIAL_MOVEMENTS.REASONS}?mr_type=${index[type]}`);

  const IS_DISABLED = disabled || !type;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.businessProcessReason')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_reason_code: value.mlitm_reason_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mlitm_reason_code"
      label={t('fields.businessProcessReason')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        disabled={IS_DISABLED}
        optionFilterProp="children"
        placeholder={t('placeholder.selectReasonBusinessProcess')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.mr_id}>
            {item.mr_action}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ReasonCode;
