import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const EmergencyProcedureGuide = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.emergencyProcedureGuide')}`);
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        hzcf_emrg: value.hzcf_emrg
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="hzcf_emrg"
      label={t('fields.emergencyProcedureGuide')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default EmergencyProcedureGuide;
