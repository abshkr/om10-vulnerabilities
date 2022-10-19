import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const Distance = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvDistance')}`);
      }
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_distance: value.delv_distance || 0,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_distance"
      label={t('fields.delvDistance')}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default Distance;
