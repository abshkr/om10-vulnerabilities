import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SellCompany = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddSellCmpyCode')}`);
      }
    }

    if (input && input.length > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_sell_cmpy_code: value.dd_sell_cmpy_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_sell_cmpy_code"
      label={t('fields.ddSellCmpyCode')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default SellCompany;
