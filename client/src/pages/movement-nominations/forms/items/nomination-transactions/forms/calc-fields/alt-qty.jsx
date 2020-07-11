import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const AltQty = ({ form, value, onChange, pageState, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranAltQty')}`);
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
        mlitm_qty_rpt: value.mlitm_qty_rpt,
      });
    }
    onChange(value.mlitm_qty_rpt);
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mlitm_qty_rpt"
      label={t('fields.nomtranAltQty')}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber
        min={0}
        max={999999999}
        precision={config.precisionVolume}
        style={{ width: '100%' }}
        onChange={onChange}
        disabled={pageState === 'transfer' ? false : false}
      />
    </Form.Item>
  );
};

export default AltQty;
