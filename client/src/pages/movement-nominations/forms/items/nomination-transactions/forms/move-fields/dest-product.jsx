import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const DestinationProduct = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranToDrawProd')}`);
      }
    }

    if (input && input.length > 256) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 256 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_prodname_to: value.mvitm_prodname_to,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_prodname_to"
      label={t('fields.nomtranToDrawProd')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'transfer' ? true : true} />
    </Form.Item>
  );
};

export default DestinationProduct;
