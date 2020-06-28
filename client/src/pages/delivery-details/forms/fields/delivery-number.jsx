import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DeliveryNumber = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddNumber')}`);
      }
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_number: value.dd_number,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_number"
      label={t('fields.ddNumber')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : true} />
    </Form.Item>
  );
};

export default DeliveryNumber;
