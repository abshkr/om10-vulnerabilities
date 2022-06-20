import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { OWNER_TRSA_REASONS } from '../../../../api';

const ReasonType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(OWNER_TRSA_REASONS.TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.otrType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        otr_type: value.otr_type,
        //otr_type_name: value.otr_type_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="otr_type" label={t('fields.otrType')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movitem_type_id}>
            {item.movitem_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ReasonType;
