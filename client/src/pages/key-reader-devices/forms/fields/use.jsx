import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { KEY_READER_DEVICES } from '../../../../api';

const Use = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(KEY_READER_DEVICES.USAGES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.use')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        krdc_use: value.krdc_use,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="krdc_use" label={t('fields.use')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectUse') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.id}>
            {item.usage}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Use;
