import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const TransferType = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    /*
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderTrsfType')}`);
    }
    */
    if (input && input.length > 60) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 60 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_trsf_type: value.order_trsf_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_trsf_type" label={t('fields.orderTrsfType')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default TransferType;
