import React, { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const SLP = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        vin_number: value.vin_number
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="vin_number" label={t('fields.vin')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default SLP;
