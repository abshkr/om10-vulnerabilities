import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const TripTime = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    console.log("rule", rule.required);
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvTripTime')}`);
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_trip_time: value.delv_trip_time
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="delv_trip_time" 
      label={t('fields.delvTripTime')} 
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default TripTime;
