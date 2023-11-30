import React, { useEffect, useCallback } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { BASE_PRODUCTS } from '../../../../api';

const Classification = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.CLASSIFICATIONS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProdClassDesc')}`);
    }

    return Promise.resolve();
  };

  const onClassificationChange = (value) => {
    const payload = getClassification(value);

    onChange(payload);
  };

  const getClassification = useCallback(
    (payload) => {
      const filtered = _.find(options?.records, ['bclass_no', String(payload)]);

      return filtered;
    },
    [options]
  );

  useEffect(() => {
    if (value) {
      const record = String(value.base_cat);

      setFieldsValue({
        base_cat: record,
      });

      const payload = getClassification(record);

      onChange(payload);
    }
  }, [value, setFieldsValue, getClassification, onChange]);

  return (
    <Form.Item
      name="base_cat"
      label={t('fields.baseProdClassDesc')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onClassificationChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectClassification') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.bclass_no}>
            {item.bclass_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Classification;
