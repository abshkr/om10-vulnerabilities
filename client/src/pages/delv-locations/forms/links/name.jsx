import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const LocationName = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.name')}`);
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
        delv_name: value.delv_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="delv_name" 
      label={t('fields.name')} 
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={true}/>
    </Form.Item>
  );
};

export default LocationName;
