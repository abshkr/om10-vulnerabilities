import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const AvailQty = ({ form, value, pageState, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranAvailQty')}`);
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
        mvitm_avail_qty: value.mvitm_prod_qty - value.mvitm_qty_schd,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mvitm_avail_qty"
      label={t('fields.nomtranAvailQty')}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber
        min={0}
        max={999999999}
        precision={config.precisionVolume}
        style={{ width: '100%' }}
        disabled={pageState === 'transfer' ? true : true}
      />
    </Form.Item>
  );
};

export default AvailQty;
