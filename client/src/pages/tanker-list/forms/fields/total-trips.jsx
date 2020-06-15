import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const TotalTrips = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_ntrips: value.tnkr_ntrips,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="tnkr_ntrips"
      label={t('fields.totalTrips')}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default TotalTrips;
