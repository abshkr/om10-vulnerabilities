import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const OrderRefCode = ({ form, value, pageState, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderRefCode')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthOrderRefCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthOrderRefCode} ─ ${t(
          'descriptions.maxCharacters'
        )}`
      );
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ref_code: value.order_ref_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="order_ref_code"
      label={t('fields.orderRefCode')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={true} />
    </Form.Item>
  );
};

export default OrderRefCode;
