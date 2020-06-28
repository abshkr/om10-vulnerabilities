import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DeliveryType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddDelvTypeName')}`);
      }
    }

    if (input && input.length > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_delv_type: value.dd_delv_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_delv_type"
      label={t('fields.ddDelvTypeName')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default DeliveryType;
