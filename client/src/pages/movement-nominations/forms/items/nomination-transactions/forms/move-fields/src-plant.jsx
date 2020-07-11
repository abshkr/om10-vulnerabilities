import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SourcePlant = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranFromPlant')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_plant_from: value.mvitm_plant_from,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_plant_from"
      label={t('fields.nomtranFromPlant')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input
        style={{ width: '100%' }}
        disabled={(pageState === 'receipt' ? true : false) || true}
      />
    </Form.Item>
  );
};

export default SourcePlant;
